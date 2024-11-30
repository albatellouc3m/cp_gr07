/* APARICION DEL POP UP */

const iniciar_boton = document.getElementById('iniciar_localiza');
const popup = document.getElementById('popup-localiza');
const papanoel = document.getElementById('trineo');
const contenido = document.getElementById('contenido');

let animationFrame; // Variable para controlar la animación

// Mostramos el pop-up al hacer clic en "Iniciar"
iniciar_boton.addEventListener('click', () => {
    popup.style.display = 'flex';

    // Configuramos la posición inicial del trineo en la esquina inferior izquierda
    inicializarPosicion();

    // Iniciamos el movimiento de Papá Noel
    iniciarMovimiento();
});

// Cerramos el pop-up al hacer clic fuera de la imagen
popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';

        // Detenemos el movimiento de Papá Noel
        detenerMovimiento();
    }
});

/* MOVIMIENTO ALEATORIO DE PAPÁ NOEL */

let velocidadX = 0.5; // Velocidad en el eje X
let velocidadY = -0.5; // Velocidad en el eje Y
let posX = 0; // Posición inicial en el eje X
let posY = 0; // Posición inicial en el eje Y

function inicializarPosicion() {

    // Posiciones iniciales
    posX = popup.offsetWidth / 6; // Empieza en el borde izquierdo
    posY = contenido.offsetHeight - papanoel.offsetHeight; // Empieza en el borde inferior

    // Aplicamos las posiciones iniciales
    papanoel.style.left = `${posX}px`;
    papanoel.style.top = `${posY}px`;

}

function moverPapanoel() {

    const popupWidth = popup.offsetWidth;
    const contenidoHeight = contenido.offsetHeight;

    // Actualizamos las posiciones de Papá Noel de acuerdo con las velocidades
    posX += velocidadX;
    posY += velocidadY;

    // Verificamos los límites del contenedor y rebota si es necesario
    if (posX < popupWidth / 6 || posX + papanoel.offsetWidth > (5 * popupWidth) / 6 ) {
        velocidadX *= -1; // Invertir dirección horizontal
        cambiarDireccionX();
    }
    if (posY < (popup.offsetHeight - contenidoHeight) / 2 || posY + papanoel.offsetHeight > popup.offsetHeight - ((popup.offsetHeight - contenidoHeight) / 2)) {
        velocidadY *= -1; // Invertir dirección vertical
    }

    // Aplicamos las nuevas posiciones
    papanoel.style.left = `${posX}px`;
    papanoel.style.top = `${posY}px`;

    // Almacenamos las coordenadas del trineo
    trineoX = posX;
    trineoY = posY;

    animationFrame = requestAnimationFrame(moverPapanoel); // Movimiento constante
}

function cambiarDireccionX() {
    // Cambiamos la dirección de la imagen horizontalmente cuando la velocidad X cambia de dirección
    papanoel.style.transform = papanoel.style.transform === 'scaleX(-1)' ? 'scaleX(1)' : 'scaleX(-1)';
}

function iniciarMovimiento() {
    // Iniciamos el movimiento constante
    animationFrame = requestAnimationFrame(moverPapanoel);
}

function detenerMovimiento() {
    // Detenemos la animación
    cancelAnimationFrame(animationFrame);
}

// MAPA INTERACTIVO PARA EL TRINEO

const trineo = document.getElementById('trineo');

// Variable para el mensaje que sigue a Papá Noel
let mensajeActivo = null;
let mensajeInterval = null;

// Efecto al hacer clic en Papá Noel
trineo.addEventListener('click', () => {
    // Añade la clase "clicked" para activar la animación
    trineo.classList.add('clicked');

    // Después de la animación, quita la clase para que pueda repetirse
    setTimeout(() => {
        trineo.classList.remove('clicked');
    }, 600); // Duración de la animación (0.6s)

    // Acción adicional: mostrar un mensaje que siga a Papá Noel y reproducir audio
    const mensaje = "¡Ho Ho Ho! ¡Feliz Navidad!";
    mostrarMensajeQueSigue(mensaje);
});

// Función para mostrar un mensaje que siga a Papá Noel
function mostrarMensajeQueSigue(texto) {
    if (mensajeActivo) {
        mensajeActivo.remove(); // Elimina el mensaje anterior si existe
        clearInterval(mensajeInterval); // Detiene el seguimiento anterior
    }

    // Crear el mensaje
    const mensaje = document.createElement('div');
    mensaje.textContent = texto;
    mensaje.style.position = 'absolute';
    mensaje.style.padding = '5px 10px';
    mensaje.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    mensaje.style.border = '1px solid #61875f';
    mensaje.style.borderRadius = '5px';
    mensaje.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    mensaje.style.color = '#61875f';
    mensaje.style.fontFamily = 'Verdana, sans-serif';
    mensaje.style.fontSize = '1.5vh';
    mensaje.style.textAlign = 'center';
    mensaje.style.zIndex = '101';
    mensaje.style.display = 'none'

    // Añadir el mensaje al contenedor del popup
    contenido.appendChild(mensaje);

     // Actualizar la posición del mensaje constantemente usando posX y posY
    mensajeInterval = setInterval(() => {
        mensaje.style.left = `${posX + papanoel.offsetWidth / 2 - mensaje.offsetWidth / 2}px`;
        mensaje.style.top = `${posY - mensaje.offsetHeight - 10}px`; // Encima de Papá Noel
        mensaje.style.display = 'block'
    }, 50);

    // Guardar el mensaje activo
    mensajeActivo = mensaje;

    // Quitar el mensaje después de 2 segundos
    setTimeout(() => {
        mensaje.remove();
        clearInterval(mensajeInterval);
        mensajeActivo = null;
    }, 2000);
}


