/* APARICION DEL POP UP */

const iniciar_boton = document.getElementById('iniciar_localiza');
const popup = document.getElementById('popup-localiza');
const papanoel = document.getElementById('trineo');

// Referencia al contenedor del trineo para hovers correctos
const trineoContenedor = document.getElementById('trineo-contenedor');
const contenido = document.getElementById('contenido');

// Referencias a los audios
const musicaFondo = new Audio('./images/audios/musica_fondo.mp3');
const audioHoHoHo = new Audio('./images/audios/ho-ho-ho.mp3');

let animationFrame; // Variable para controlar la animación

// Configuración de la música de fondo
musicaFondo.loop = true; // Se reproduce en bucle
musicaFondo.volume = 0.5;
const volumenReducido = 0.2; // Volumen reducido durante "Ho Ho Ho"


// Mostramos el pop-up al hacer clic en "Iniciar"
iniciar_boton.addEventListener('click', () => {
    popup.style.display = 'flex';

    // Configuramos la posición inicial del trineo en la esquina inferior izquierda
    inicializarPosicion();

    // Iniciamos el movimiento de Papá Noel
    iniciarMovimiento();

    // Reproducimos la música de fondo
    musicaFondo.play();
});

// Cerramos el pop-up al hacer clic fuera de la imagen
popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';

        // Detenemos el movimiento de Papá Noel
        detenerMovimiento();

        // Pausamos la música de fondo
        musicaFondo.pause();
        musicaFondo.currentTime = 0;
    }
});

/* MOVIMIENTO ALEATORIO DE PAPÁ NOEL */

let velocidadX = 0.5; // Velocidad en el eje X
let velocidadY = -0.5; // Velocidad en el eje Y
let posX = 0; // Posición inicial en el eje X
let posY = 0; // Posición inicial en el eje Y

function inicializarPosicion() {
    // Posiciones iniciales elegidas
    posX = popup.offsetWidth / 6;
    posY = contenido.offsetHeight - trineoContenedor.offsetHeight;

    // Aplicamos las posiciones iniciales al contenedor
    trineoContenedor.style.left = `${posX}px`;
    trineoContenedor.style.top = `${posY}px`;
}

function moverPapanoel() {
    const popupWidth = popup.offsetWidth;
    const contenidoHeight = contenido.offsetHeight;

    if (window.innerWidth < 700) {
        // Límites ajustados para móviles
        limiteIzquierdo = 0;
        limiteDerecho = popupWidth;
        limiteSuperior = (popup.offsetHeight - contenidoHeight) / 2;
        limiteInferior = popup.offsetHeight - (popup.offsetHeight - contenidoHeight) / 2;
    } else {
        // Límites generales para tablet y desktop
        limiteIzquierdo = popupWidth / 6;
        limiteDerecho = (5 * popupWidth) / 6;
        limiteSuperior = (popup.offsetHeight - contenidoHeight) / 2;
        limiteInferior = popup.offsetHeight - (popup.offsetHeight - contenidoHeight) / 2;
    }

    // Actualizamos las posiciones de Papá Noel de acuerdo con las velocidades
    posX += velocidadX;
    posY += velocidadY;

    // Verificamos los límites del contenedor y rebota si es necesario
    if (posX < limiteIzquierdo || posX + trineoContenedor.offsetWidth > limiteDerecho) {
        velocidadX *= -1; // Invertimos dirección horizontal
        cambiarDireccionX();
    }
    if (posY < limiteSuperior || posY + trineoContenedor.offsetHeight > limiteInferior) {
        velocidadY *= -1; // Invertimos dirección vertical
    }

    // Aplicamos las nuevas posiciones al contenedor
    trineoContenedor.style.left = `${posX}px`;
    trineoContenedor.style.top = `${posY}px`;

    // Movimiento constante
    animationFrame = requestAnimationFrame(moverPapanoel);
}

function cambiarDireccionX() {
    // Cambiamos la dirección de la imagen horizontalmente cuando la velocidad X cambia de dirección
    trineoContenedor.style.transform = trineoContenedor.style.transform === 'scaleX(-1)' ? 'scaleX(1)' : 'scaleX(-1)';
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

    // Reducimos el volumen de la música de fondo
    volumenNormal = musicaFondo.volume
    musicaFondo.volume = volumenReducido;

    // Reproducimos el sonido de "Ho Ho Ho"
    audioHoHoHo.play();

    // Restauramos el volumen de la música de fondo después de que termine "Ho Ho Ho"
    audioHoHoHo.addEventListener('ended', () => {
        musicaFondo.volume = volumenNormal
    });

    // Añade la clase "clicked" para activar la animación
    trineo.classList.add('clicked');

    // Después de la animación, quita la clase para que pueda repetirse
    setTimeout(() => {
        trineo.classList.remove('clicked');
    }, 600); 

    // Acción adicional: mostrar un mensaje que siga a Papá Noel y reproducir audio
    const mensaje = "¡Ho Ho Ho! ¡Merry Christmas!";
    mostrarMensajeQueSigue(mensaje);
});

// Función para mostrar un mensaje que siga a Papá Noel
function mostrarMensajeQueSigue(texto) {
    if (mensajeActivo) {
        mensajeActivo.remove(); // Elimina el mensaje anterior si existe
        clearInterval(mensajeInterval); // Detiene el seguimiento anterior
    }

    // Creamos el mensaje
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

    // Añadimos el mensaje al contenedor del popup
    contenido.appendChild(mensaje);

     // Actualizamos la posición del mensaje constantemente usando posX y posY
    mensajeInterval = setInterval(() => {
        mensaje.style.left = `${posX + papanoel.offsetWidth / 2 - mensaje.offsetWidth / 2}px`;
        mensaje.style.top = `${posY - mensaje.offsetHeight - 10}px`; // Encima de Papá Noel
        mensaje.style.display = 'block'
    }, 50);

    
    mensajeActivo = mensaje;

    // Quitamos el mensaje después de 2 segundos
    setTimeout(() => {
        mensaje.remove();
        clearInterval(mensajeInterval);
        mensajeActivo = null;
    }, 2000);
}


