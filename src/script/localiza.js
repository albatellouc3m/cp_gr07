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
