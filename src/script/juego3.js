document.addEventListener('DOMContentLoaded', () => {
    // Incializar elementos
    const btnEmpezar3 = document.getElementById('btnEmpezar3');
    const btnReiniciar3 = document.getElementById('btnReiniciar3');
    const pantallaInicio = document.getElementById('juego3-inicio');
    const pantallaFinal = document.getElementById('juego3-final');
    const mensajeFinal = document.getElementById('mensaje-final3');
    const temporizador = document.getElementById('temporizador3');
    const jugador = document.getElementById('jugador');
    const grinch = document.getElementById('grinch');
    const tablero = document.getElementById('tablero');

    // Variables de estado para el jeugo
    let juegoActivo = false;
    let jugadorPos = { x: 0, y: 0 };
    let grinchPos = { x: 0, y: 0 };
    let tiempoRestante = 20;
    const velocidadJugador = 20;
    const velocidadGrinch = 1;
    let intervalId = null;
    let animacionId = null;

    function iniciarJuego() {
        // Reiniciar posiciones y mostrar elementos
        pantallaInicio.style.display = 'none';
        pantallaFinal.style.display = 'none';
        
        // Asegurarse de que el tablero y los personajes sean visibles
        tablero.style.display = 'block';
        jugador.style.display = 'block';
        grinch.style.display = 'block';
        
        // Colocar personajes en posiciones iniciales
        jugadorPos = { 
            x: Math.floor(Math.random() * (tablero.clientWidth - 45)), 
            y: Math.floor(Math.random() * (tablero.clientHeight - 45))
        };
        
        // Colocar el Grinch en el lado opuesto
        grinchPos = { 
            x: tablero.clientWidth - jugadorPos.x - 45,
            y: tablero.clientHeight - jugadorPos.y - 45
        };
        
        actualizarPosiciones();
        
        // Inicializar variables y eventos
        juegoActivo = true;
        tiempoRestante = 20;
        temporizador.textContent = tiempoRestante;
        
        // Eventos
        window.addEventListener('keydown', manejarMovimiento);
        intervalId = setInterval(actualizarTemporizador, 1000);
        gameLoop();
    }

    // Función para actualizar las posiciones de los personajes
    function actualizarPosiciones() {
        // Ajustar si están fuera del tablero
        jugadorPos.x = Math.min(Math.max(0, jugadorPos.x), tablero.clientWidth - jugador.offsetWidth);
        jugadorPos.y = Math.min(Math.max(0, jugadorPos.y), tablero.clientHeight - jugador.offsetHeight);
    
        grinchPos.x = Math.min(Math.max(0, grinchPos.x), tablero.clientWidth - grinch.offsetWidth);
        grinchPos.y = Math.min(Math.max(0, grinchPos.y), tablero.clientHeight - grinch.offsetHeight);
    
        // Actualizar estilos
        jugador.style.left = `${jugadorPos.x}px`;
        jugador.style.top = `${jugadorPos.y}px`;
        grinch.style.left = `${grinchPos.x}px`;
        grinch.style.top = `${grinchPos.y}px`;
    }
    
    // Función para manejar el movimiento del jugador
    function manejarMovimiento(event) {
        if (!juegoActivo) return;
        
        // Limites dentro del tablero
        const limiteX = tablero.clientWidth - 45;
        const limiteY = tablero.clientHeight - 45;

        // Mover jugador
        switch (event.key) {
            case 'ArrowUp':
                jugadorPos.y = Math.max(0, jugadorPos.y - velocidadJugador);
                break;
            case 'ArrowDown':
                jugadorPos.y = Math.min(limiteY, jugadorPos.y + velocidadJugador);
                break;
            case 'ArrowLeft':
                jugadorPos.x = Math.max(0, jugadorPos.x - velocidadJugador);
                break;
            case 'ArrowRight':
                jugadorPos.x = Math.min(limiteX, jugadorPos.x + velocidadJugador);
                break;
            default:
                return;
        }
        event.preventDefault();
        actualizarPosiciones();
    }

    // Función para mover al Grinch automáticamente
    function moverGrinch() {
        const dx = jugadorPos.x - grinchPos.x;
        const dy = jugadorPos.y - grinchPos.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia > velocidadGrinch) {
            grinchPos.x += (dx / distancia) * velocidadGrinch;
            grinchPos.y += (dy / distancia) * velocidadGrinch;
        }
    
        actualizarPosiciones();
        comprobarColision();
    }

    // Función para comprobar si el jugador y el Grinch colisionan
    function comprobarColision() {
        const distancia = Math.sqrt(
            Math.pow(jugadorPos.x - grinchPos.x, 2) + 
            Math.pow(jugadorPos.y - grinchPos.y, 2)
        );
        
        // Si el grinch está muy cerca, finalizar el juego
        if (distancia < 30) {
            finalizarJuego('¡El Grinch te atrapó!');
        }
    }

    // Función para actualizar el temporizador
    function actualizarTemporizador() {
        tiempoRestante--;
        temporizador.textContent = tiempoRestante;
        
        if (tiempoRestante <= 0) {
            finalizarJuego('¡Has ganado! El Grinch no te atrapó');
        }
    }

    // Función para finalizar el juego
    function finalizarJuego(mensaje) {
        juegoActivo = false;
        clearInterval(intervalId);
        cancelAnimationFrame(animacionId);
        window.removeEventListener('keydown', manejarMovimiento);
        // Mostrar mensaje final
        mensajeFinal.textContent = mensaje;
        pantallaFinal.style.display = 'flex';
        
        // Ocultar personajes al finalizar
        jugador.style.display = 'none';
        grinch.style.display = 'none';
    }

    // Función para el loop del juego
    function gameLoop() {
        if (juegoActivo) {
            moverGrinch();
            animacionId = requestAnimationFrame(gameLoop);
        }
    }

    // Función para reiniciar el juego
    function reiniciarJuego() {
        pantallaFinal.style.display = 'none';
        pantallaInicio.style.display = 'flex';
        tablero.style.display = 'none';
        jugador.style.display = 'none';
        grinch.style.display = 'none';
    }

    btnEmpezar3.addEventListener('click', iniciarJuego);
    btnReiniciar3.addEventListener('click', reiniciarJuego);
});