//JUEGO 1: ATRAPA EL REGALO
//codigo de izan pero por ahora pego el mio
// iniciamos unas cuantas varaibles necesarias para el juego
const $circle = $('#circle');
const $gameBoard = $('#gameBoard');
const $scoreDisplay = $('#score');
const $timeDisplay = $('#time');
const $gameOverMessage = $('#gameOverMessage');
const $pantallaInicio = $('#juego1-inicio');
const $pantallaFinal = $('#juego1-final');
const $containerJuego = $('.container'); // Contenedor del juego
const $btnEmpezar1 = $('#btnEmpezar1');
const $btnReiniciar1 = $('#btnReiniciar1');
const $juego1 = $('#juego1');

// lista para las imaganes de los copos de nieve para que vayan cambiando tope huapo
const snowflakeImages = [
    '../ej/images/copo1.svg',
    '../ej/images/copo2.svg',
    '../ej/images/copo3.svg',
    '../ej/images/copo4.svg',
];

let score = 0;
let timeLeft = 90; // 1 minuto y 30 segundos
let gameInterval;
let circleMoveInterval;

// iniciar cuando se haga click en el boton de empezar
$btnEmpezar1.on('click', function() {
    $pantallaInicio.hide();
    $pantallaFinal.hide();
    startGame();
});

$btnReiniciar1.on('click', function() {
    resetJuego1();                  // reiniciar el juego
    $pantallaFinal.hide();           // ocultar pantalla final
    $pantallaInicio.show();          // mostrar pantalla inicial
});

//FUNCION QUE COGE UN COOPO DE NIEVE RANDOM DE LA LISTA
function getRandomSnowflake() {
    const randomIndex = Math.floor(Math.random() * snowflakeImages.length);
    return snowflakeImages[randomIndex];
}

function startJuego1() {
    // ocultamos la pantalla de incio y mostramos el juego
    const pantallaInicio = document.getElementById('juego1-inicio');
    const juegoContainer = document.getElementById('juego1');

    pantallaInicio.style.display = 'none';
    juegoContainer.querySelector('.container').style.display = 'block';
    document.getElementById('circle').style.display = 'block';

    // lllamamos a la funcion para empezar
    startGame();
}

// FUNCION PARA MOVER EL CIRCULO A UNA POSICION ALEATORIA DEL TABLERO
function moveCircle() {
    
    const boardWidth = $gameBoard.width();
    const boardHeight = $gameBoard.height();
    const circleSize = $circle.width();

    const randomX = Math.floor(Math.random() * (boardWidth - circleSize));
    const randomY = Math.floor(Math.random() * (boardHeight - circleSize));

    $circle.css({ left: randomX + 'px', top: randomY + 'px' }); // mover circulo posicion aleatoria
    $circle.css('background-image', `url(${getRandomSnowflake()})`); // cambiar imagen del copo de nieve
}

// FUNCION PARA INICIAR EL JUEGO
function startGame() {
    // restablecemos los valores por si acaso
    score = 0;
    timeLeft = 90;
    $scoreDisplay.text(score);
    $timeDisplay.text(timeLeft);
    $gameOverMessage.text('');
    $juego1.show(); // mostrar juego1 
    $circle.show(); // circulo visible


    moveCircle(); // mover el circulo a una posicion aleatoria
    clearInterval(circleMoveInterval); // asegurarse de que no haya intervalos previos
    clearInterval(gameInterval); // asegurarse de que no haya intervalos previos
    circleMoveInterval = setInterval(moveCircle, 1500); // mover cada 1.5 segundos
    gameInterval = setInterval(updateGame, 1000); // actualizar el tiempo cada segundo
}

// FUNCION QUE ACUTALIZA EL TIEMPO Y DICE SI HA TERMINAD EL JUEGO
function updateGame() {
    timeLeft--;
    $timeDisplay.text(timeLeft);

    if (timeLeft <= 0) {
        endGame();
    }
}

// FUNCION QUE FINALIZA EL JUEGO
function endGame() {
    clearInterval(gameInterval);
    clearInterval(circleMoveInterval);
    $circle.hide();                  // oculta el circulo
    $containerJuego.hide();          // oculta contenedor del juego
    $pantallaFinal.show();           // mostrar la pantalla final
    $('#scoreFinal').text(score);    // mostrar puntaje final
}

// cuando se hace click en el circulo se suma un puntoooo
$circle.on('click', function() {
    score++;
    $scoreDisplay.text(score);
    clearInterval(circleMoveInterval); // asegurarse de que no haya intervalos previos
    clearInterval(gameInterval); // asegurarse de que no haya intervalos previos
    circleMoveInterval = setInterval(moveCircle, 1500); // mover cada 1.5 segundos
    gameInterval = setInterval(updateGame, 1000); // actualizar el tiempo cada segundo
    moveCircle();
    
});

// cuando se hace click fuera del circulo se resta un punto
$gameBoard.on('click', function(e) {
    if (!$(e.target).is($circle)) {
        score -= 1; // restar 1 punto
        if (score < 0) score = 0; // asegurarse de que los puntos no sean negativos
        $scoreDisplay.text(score);

        if (timeLeft <= 0) {
            endGame(); // finalizar el juego si el tiempo llega a 0
        }
    }
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
