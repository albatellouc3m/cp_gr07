

//JUEGO 2: MEMORIA
// lista para los iconitos de las cartas
const cartas = [
    '../src/images/memoria/memoria-arbol.svg', '../src/images/memoria/memoria-arbol.svg',
    '../src/images/memoria/memoria-bola.svg', '../src/images/memoria/memoria-bola.svg',
    '../src/images/memoria/memoria-campana.svg', '../src/images/memoria/memoria-campana.svg',
    '../src/images/memoria/memoria-estrella.svg', '../src/images/memoria/memoria-estrella.svg',
    '../src/images/memoria/memoria-gorro.svg', '../src/images/memoria/memoria-gorro.svg',
    '../src/images/memoria/memoria-luces.svg', '../src/images/memoria/memoria-luces.svg',
    '../src/images/memoria/memoria-planta.svg', '../src/images/memoria/memoria-planta.svg',
    '../src/images/memoria/memoria-regalo.svg', '../src/images/memoria/memoria-regalo.svg'
];

// variables necesarias
const $btnReiniciar2 = $('#btnReiniciar2');
const $pantallaFinal2 = $('#juego2-final');

let primeraCarta = null;
let segundaCarta = null;
let lockBoard = false;

let parejas = 0;
const totalParejas = cartas.length / 2;
let timeLeft2 = 90; // 1 minuto y 30 segundos
let timer2;

// cuando se hace click en reiniciar juego se reinicia el juego
$btnReiniciar2.on('click', function() {
    startGame2();                  // reiniciar el juego
    $pantallaFinal2.hide();         // ocultar pantalla final
    timeLeft2 = 90;                 // reiniciar el tiempo
});

// FUNCION PARA MEZCLAR LAS CARTAS DE MANERA ALEATORIA
function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// FUNCION PARA INICIAR EL JUEGO
function startGame2(){
    // quitamos la pantalla de inicio
    const pantallaInicio2 = document.getElementById('juego2-inicio');
    const juegoContainer2 = document.getElementById('juego2');
    const timeDisplay = document.getElementById('timeDisplay');

    // reiniciamos el tiempo si hace falta
    timeLeft2 = 90;
    timeDisplay.style.display = 'block'; // mostramos el tiempo que queda

    pantallaInicio2.style.display = 'none'; // ocultar la pantalla de inicio
    juegoContainer2.querySelector('.game-board2').style.display = 'grid'; // mostrar el tablero

    crearTablero();

    // iniciar temporizador
    timer2 = setInterval(() => {
        timeLeft2--;
        if (timeLeft2 <= 0) {
            endGame2(false); // si el tiempo llega a 0 pierdes el juego jaja
        }
        document.getElementById('timeDisplay').textContent = `Tiempo restante: ${timeLeft2}s`;
    }, 1000); // cada segundo

}

// FUNCION PARA CREAR EL TABLERO DE JUEGO
function crearTablero() {
    const tablero = $('.game-board2');
    tablero.empty(); // limpiar las cartas existentes
    mezclar(cartas); // mezclar las cartas
    // crear las cartas
    $.each(cartas, function(index, card) {
        const cardElement = $('<div class="card"></div>');
        cardElement.data('icon', card);
        cardElement.html(`
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><img src="${card}" alt="carta"></div>
            </div>
        `);
        cardElement.on('click', girarCarta);
        tablero.append(cardElement);
    });
}

// FUNCION PARA DAR LA VUELTA A LAS CARTAS
function girarCarta() {
    if (lockBoard) return;
    if ($(this).is(primeraCarta)) return;

    $(this).addClass('flipped');

    if (!primeraCarta) {
        primeraCarta = $(this);
        return;
    }

    segundaCarta = $(this);
    hacerPareja(); // chequear si hay coincidencia
}

// FUNCION PARA CHECKEAR SI LAS DOS CARTAS COINCIDEN
function hacerPareja() {
    if (primeraCarta.data('icon') === segundaCarta.data('icon')) {
        deshabilitarCartas(); // si has seleccionado dos cartas, deshabilitamos que puedas seleccionar mas
        parejas++; // si coinciden, aumentamos las parejas encontradas
        if (parejas === totalParejas) {
            endGame2(true); // ganas si has encontrado todsa las parejas
        }
    } else {
        resetearCartas();
    }
}

// FUNCION PARA DESHABILITAR QUE LAS CARTAS SEAN CLICKEADAS
function deshabilitarCartas() {
    primeraCarta.off('click');
    segundaCarta.off('click');
    resetearTablero();
}

// FUNCION PARA DAR LA VUELTA A LAS CARTAS AUTOMATICAMENTE SI NO HAY MATCH
function resetearCartas() {
    lockBoard = true;
    setTimeout(() => {
        primeraCarta.removeClass('flipped');
        segundaCarta.removeClass('flipped');
        resetearTablero(); // resetear el tablero si no hay match
    }, 1500);
}

// FUNCION PARA RESETEAR EL TABLERO
function resetearTablero() {
    primeraCarta = null;
    segundaCarta = null;
    lockBoard = false;
}

// FUNCION PARA ACABAR EL JUEGO 
function endGame2(hasWon) {
    clearInterval(timer2); // detenemos el temporizador
    const pantallaFinal2 = document.getElementById('juego2-final');
    const mensajeExito = document.getElementById('mensaje-exito');
    const mensajeFracaso = document.getElementById('mensaje-fracaso');
    const tiempoFinal = document.getElementById('timeDisplay');

    parejas = 0; // reiniciar las parejas encontradas

    const $gameBoard2 = $('.game-board2');
    $gameBoard2.empty(); // limpiar el tablero

    tiempoFinal.style.display = 'none';
    
    // mostrar mensaje según el resultado
    if (hasWon) {
        mensajeExito.style.display = 'flex';
        mensajeFracaso.style.display = 'none';
    } else {
        mensajeExito.style.display = 'none';
        mensajeFracaso.style.display = 'flex';
    }
    
    pantallaFinal2.style.display = 'flex'; // mostrar la pantalla final
}
