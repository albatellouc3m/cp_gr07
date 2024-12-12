// JUEGO 1

  // Codigo para actualizar el contador de puntos y el timer
  let score = 0;
  let timeLeft = 30;
  let timerInterval;
  let movimiento;

  // Asociamos la función startGame al boton "Jugar"
  $('#btnEmpezar1').on('click', startGame);

  // Función para actualizar el puntaje al hacer clic en el regalo
  $('#regalo').on('click', function () {
      score++;
      $('#score').text(score);

      // Si das click al regalo, se mueve y se reinicia intervalo automático
      // Detenemos el movimiento
      clearInterval(movimiento); 
      // Movemos el regalo
      moverRegalo(); 
      // Reiniciamos el intervalo
      movimiento = setInterval(moverRegalo, 1250); 
  });

  // Evento para disminuir el score al fallar el click
  $('#juego1').on('click', function (event) {
      if (event.target.id !== 'regalo' && event.target.id !== 'btnEmpezar1' && event.target.id !== 'btnReiniciar1') { // Verifica que el clic no sea en el regalo
          score--;
          $('#score').text(score);
      }
  });

  // Función para iniciar el juego
  function startGame() {
      // Reiniciamos el puntaje y el tiempo
      score = 0;
      timeLeft = 30;
      $('#score').text(score);
      $('#timer').text(timeLeft + "s");

      // Desactivamos el botón de jugar y mostramos el regalo mientras el juego está en progreso
      $('#btnEmpezar1').hide();
      $('#juego1-inicio').hide();
      $('#titulo').hide();
      $('#juego1').show();
      $('#score_container').show();
      $('#timer_container').show();
      $('#regalo').show();
      // Ocultamos el mensaje
      $('#puntos_finales').hide(); 

      // Iniciamos el temporizador
      timerInterval = setInterval(function () {
          timeLeft--;
          $('#timer').text(timeLeft + "s");

          // Cuando el tiempo llega a 0, paramos
          if (timeLeft === 0) {
              clearInterval(timerInterval);
              clearInterval(movimiento); 
              endGame();
          }
      }, 1000); // Funcion que se hace cada 1000ms o 1s

      // Movemos el círculo en cada segundo
      movimiento = setInterval(moverRegalo, 1250);
  }

  // Función para mover el regalo a una posicion aleatoria dentro del contenedor
  function moverRegalo() {
      const contenedor = $('#juego1')[0];
      const regalo = $('#regalo')[0];

        // Array con las rutas de los regalos
        const rutasRegalos = [
            'images/regalo1.svg',
            'images/regalo2.svg',
            'images/regalo3.svg',
            'images/regalo4.svg'
        ];
      
      // Obtiene el tamaño del contenedor y del regalo
      const tamaño_contenedor = contenedor.getBoundingClientRect();
      const tamaño_regalo = regalo.getBoundingClientRect();
      
      // Calcula una posición aleatoria para el regalo
      const rango_x = tamaño_contenedor.width - tamaño_regalo.width;
      const rango_y = tamaño_contenedor.height - tamaño_regalo.height;
      const random_x = Math.floor(Math.random() * rango_x);
      const random_y = Math.floor(Math.random() * rango_y);

      // Y actualiza la posición del regalo
      $(regalo).css({
          left: random_x + "px",
          top: random_y + "px"
      });

      // Cambia el src del regalo a una ruta aleatoria
        const randomIndex = Math.floor(Math.random() * rutasRegalos.length);
        $(regalo).attr('src', rutasRegalos[randomIndex]);
  }

  // Funcion usada para mostrar el puntaje final y resetear el juego
  function endGame() {
      clearInterval(movimiento); 
      $('#valor_final').text(score); 
      $('#puntos_finales').show(); 
      $('#valor_final').show();
      $('#regalo').hide();
      $('#score_container').hide();
      $('#timer_container').hide(); 
      $('#btnReiniciar1').show(); 
      $('#juego1-final').show(); 
  }

  // Funcion que usamos para reiniciar el juego
  $('#btnReiniciar1').on('click', function () {
      $('#btnReiniciar1').hide();
      $('#juego1-final').hide();
      $('#puntos_finales').hide();
      $('#valor_final').hide();

      // Reiniciamos el temporizador
      clearInterval(timerInterval); 
      clearInterval(movimiento); 

      resetJuego1();

      $('#btnEmpezar1').show();
  });