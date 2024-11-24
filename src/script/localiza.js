/* APARICION DEL POP UP */

const iniciar_boton = document.getElementById('iniciar_localiza');
const popup = document.getElementById('popup-localiza');
const papanoel = document.getElementById('trineo');
const contenido = document.querySelector('.contenido');

let animationFrame; // Variable para controlar la animación

// Mostrar el pop-up al hacer clic en "Iniciar"
iniciar_boton.addEventListener('click', () => {
    popup.style.display = 'flex';

    // Configura la posición inicial del trineo en la esquina inferior izquierda
    inicializarPosicion();

    // Inicia el movimiento de Papá Noel
    iniciarMovimiento();
});

// Cerrar el pop-up al hacer clic fuera de la imagen
popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';

        // Detén el movimiento de Papá Noel
        detenerMovimiento();
    }
});

/* MOVIMIENTO CONSTANTE DE PAPÁ NOEL */

let velocidadX = 0.5; // Velocidad en el eje X
let velocidadY = -0.5; // Velocidad en el eje Y (hacia arriba inicialmente)
let posX = 0; // Posición inicial en el eje X (borde izquierdo)
let posY = 0; // Posición inicial en el eje Y (borde inferior)

function inicializarPosicion() {
    const contWidth = contenido.offsetWidth;
    const contHeight = contenido.offsetHeight;

    // Establece la posición inicial en el borde inferior izquierdo
    posX = popup.offsetWidth - contWidth; // Empieza en el borde izquierdo
    posY = contHeight - papanoel.offsetHeight; // Empieza en el borde inferior

    // Aplica la posición inicial
    papanoel.style.left = `${posX}px`;
    papanoel.style.top = `${posY}px`;
}

function moverPapanoel() {
    const contWidth = contenido.offsetWidth;
    const contHeight = contenido.offsetHeight;

    // Actualiza la posición
    posX += velocidadX;
    posY += velocidadY;

    // Verifica los límites del contenedor y rebota si es necesario
    if (posX <= 0 || posX + papanoel.offsetWidth >= contWidth) {
        velocidadX *= -1; // Cambia de dirección en X
    }
    if (posY <= 0 || posY + papanoel.offsetHeight >= contHeight) {
        velocidadY *= -1; // Cambia de dirección en Y
    }

    // Aplica las nuevas posiciones
    papanoel.style.left = `${posX}px`;
    papanoel.style.top = `${posY}px`;

    // Solicita el siguiente cuadro de animación
    animationFrame = requestAnimationFrame(moverPapanoel);
}

function iniciarMovimiento() {
    // Inicia el movimiento constante
    animationFrame = requestAnimationFrame(moverPapanoel);
}

function detenerMovimiento() {
    // Detiene la animación
    cancelAnimationFrame(animationFrame);
}
