(function($) {
    // Plugin jQuery para la galería
    $.fn.galeria = function(options) {
        // Iterar sobre cada elemento seleccionado y aplicar la función slide
        $(this).each(function(index, ele) {
            slide(ele, options);
        });
        return this;
    };

    // Función principal para manejar la galería
    function slide(ele, options) {
        var $ele = $(ele); // Elemento de la galería
        var $lis = $ele.find('li'); // Elementos de la lista de imágenes
        var states = getStates(); // Obtener los estados iniciales

        // Configuración predeterminada y opciones personalizadas
        var setting = $.extend({
            width: 1000,
            height: 270,
            speed: 500,
            interval: 2000
        }, options);

        var timer = null; // Temporizador para el autoPlay

        // Evento para el botón de navegación anterior
        $ele.find('.galeria-prev').on('click', function() {
            states.push(states.shift()); // Mover el primer estado al final
            move(); // Actualizar la galería
        });

        // Evento para el botón de navegación siguiente
        $ele.find('.galeria-next').on('click', function() {
            states.unshift(states.pop()); // Mover el último estado al principio
            move(); // Actualizar la galería
        });

        // Evento para recargar la página cuando se redimensiona la ventana
        $(window).on('resize', function() {
            location.reload();
        });

        // Detener el autoPlay cuando el ratón entra en la galería
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay(); // Reanudar el autoPlay cuando el ratón sale de la galería
        });

        move(); // Mover los elementos a sus posiciones iniciales
        autoPlay(); // Iniciar el autoPlay

        // Función para mover los elementos de la galería
        function move() {
            $lis.each(function(index, element) {
                var state = states[index]; // Obtener el estado correspondiente
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

        // Función para mover al siguiente elemento
        function next() {
            states.unshift(states.pop()); // Mover el último estado al principio
            move(); // Actualizar la galería
        }

        // Función para iniciar el autoPlay
        function autoPlay() {
            timer = setInterval(next, setting.interval); // Mover al siguiente elemento en intervalos regulares
        }

        // Función para obtener los estados de los elementos según el tamaño de la ventana
        function getStates() {
            if (window.innerWidth <= 500) {
                return [
                    { $zIndex: 1, width: 100, height: 120, top: '50%', left: '50%', $opacity: 0.2, marginTop: '-60px', marginLeft: '-50px' },
                    { $zIndex: 2, width: 120, height: 140, top: '40%', left: '50%', $opacity: 0.5, marginTop: '-70px', marginLeft: '-60px' },
                    { $zIndex: 3, width: 140, height: 160, top: '30%', left: '50%', $opacity: 0.7, marginTop: '-80px', marginLeft: '-70px' },
                    { $zIndex: 4, width: 160, height: 180, top: '20%', left: '50%', $opacity: 1, marginTop: '-90px', marginLeft: '-80px' },
                    { $zIndex: 3, width: 140, height: 160, top: '30%', left: '50%', $opacity: 0.7, marginTop: '-80px', marginLeft: '-70px' },
                    { $zIndex: 2, width: 120, height: 140, top: '40%', left: '50%', $opacity: 0.5, marginTop: '-70px', marginLeft: '-60px' },
                    { $zIndex: 1, width: 100, height: 120, top: '50%', left: '50%', $opacity: 0.2, marginTop: '-60px', marginLeft: '-50px' }
                ];
            } else if (window.innerWidth <= 900) {
                return [
                    { $zIndex: 1, width: 80, height: 100, top: 69, left: '0%', $opacity: 0.2 },
                    { $zIndex: 2, width: 100, height: 120, top: 59, left: '12%', $opacity: 0.5 },
                    { $zIndex: 3, width: 120, height: 140, top: 35, left: '24%', $opacity: 0.7 },
                    { $zIndex: 4, width: 140, height: 160, top: 0, left: '40%', $opacity: 1 },
                    { $zIndex: 3, width: 120, height: 140, top: 35, left: '56%', $opacity: 0.7 },
                    { $zIndex: 2, width: 100, height: 120, top: 59, left: '68%', $opacity: 0.5 },
                    { $zIndex: 1, width: 80, height: 100, top: 69, left: '80%', $opacity: 0.2 }
                ];
            } else {
                return [
                    { $zIndex: 1, width: 290, height: 290, top: 69, left: 134, $opacity: 0.2 },
                    { $zIndex: 2, width: 300, height: 300, top: 59, left: 0, $opacity: 0.5 },
                    { $zIndex: 3, width: 400, height: 400, top: 35, left: 110, $opacity: 0.7 },
                    { $zIndex: 4, width: 500, height: 500, top: 0, left: 263, $opacity: 1 },
                    { $zIndex: 3, width: 400, height: 400, top: 35, left: 470, $opacity: 0.7 },
                    { $zIndex: 2, width: 300, height: 300, top: 59, left: 620, $opacity: 0.5 },
                    { $zIndex: 1, width: 290, height: 290, top: 69, left: 500, $opacity: 0.2 }
                ];
            }
        }
    }

    // Aquí añadimos la inicialización de la galería cuando el documento esté listo
    $(document).ready(function(){
        $('.galeria').galeria();
    });

})(jQuery);
