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

    // cambia el color del botón seleccionado
    const botones = document.querySelectorAll('.game-selec');
    botones.forEach(boton => boton.classList.remove('selected'));
    const botonSeleccionado = document.querySelector(`button[onclick="mostrarJuego('${idJuego}')"]`);
    if (botonSeleccionado) {
        botonSeleccionado.classList.add('selected');
    }
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
