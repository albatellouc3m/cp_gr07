// FUNCIONES GLOBALES PARA TODOS LOS JUEGOS
function mostrarJuego(idJuego) {
    // oculta todas las imágenes de los juegos 
    const juegos = document.querySelectorAll('.img-juego');
    juegos.forEach(juego => {
        juego.style.display = 'none';
    });
    
    // oculta los contenedores de los juegos
    document.getElementById('juego1').style.display = 'none';
    document.getElementById('juego2').style.display = 'none';
    document.getElementById('juego3').style.display = 'none';
    
    // si se selecciona el juego 1, se reinicia
    if (idJuego === 'juego1') {
        resetJuego1();
    }

    // si se selecciona el juego 2, se reinicia
    else if (idJuego === 'juego2') {
        resetJuego2();
    }

    // muestra la imagen del juego seleccionado
    document.getElementById(idJuego).style.display = 'block';
}

// FUNCION PARA INICIAR EL JUEGO 1
function resetJuego1(){
    const pantallaInicio1 = document.getElementById('juego1-inicio');
    pantallaInicio1.style.display = 'flex'; // mostamos la pantalla de inicio
}

// FUNCION PARA INICIAR EL JUEGO 2
function resetJuego2(){
    const pantallaInicio2 = document.getElementById('juego2-inicio');
    const juegoContainer2 = document.getElementById('juego2');

    pantallaInicio2.style.display = 'flex'; // mostamos la pantalla de inicio

    juegoContainer2.querySelector('.game-board2').style.display = 'none'; // ocultar las cartas
}

// cuando se hace click en el boton de empezar del juego 2 se inicia
document.getElementById('btnEmpezar2').addEventListener('click', function (){
    document.querySelector('.game-board2').innerHTML = ''; // reinicia el tablero
    startGame2(); // EMPIEZA EL JUEGOOO
});



//JUEGO 2: ESCAPA DEL GRINCH
//codigo de diego 


//JUEGO 3: MEMORIA
// lista para los iconitos de las cartas
const cartas = [
    '../ej/images/memoria-arbol.svg', '../ej/images/memoria-arbol.svg',
    '../ej/images/memoria-bola.svg', '../ej/images/memoria-bola.svg',
    '../ej/images/memoria-campana.svg', '../ej/images/memoria-campana.svg',
    '../ej/images/memoria-estrella.svg', '../ej/images/memoria-estrella.svg',
    '../ej/images/memoria-gorro.svg', '../ej/images/memoria-gorro.svg',
    '../ej/images/memoria-luces.svg', '../ej/images/memoria-luces.svg',
    '../ej/images/memoria-planta.svg', '../ej/images/memoria-planta.svg',
    '../ej/images/memoria-regalo.svg', '../ej/images/memoria-regalo.svg'
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
        mensajeExito.style.display = 'block';
        mensajeFracaso.style.display = 'none';
    } else {
        mensajeExito.style.display = 'none';
        mensajeFracaso.style.display = 'block';
    }
    
    pantallaFinal2.style.display = 'flex'; // mostrar la pantalla final
}
