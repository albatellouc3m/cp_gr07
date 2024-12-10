(function($) {
    $.fn.galeria = function(options) {
        $(this).each(function(index, ele) {
            slide(ele, options);
        });
        return this;
    };

    function slide(ele, options) {
        var $ele = $(ele);
        var $lis = $ele.find('li');
        var states = getStates();

        var setting = $.extend({
            width: 1000,
            height: 270,
            speed: 500,
            interval: 2000
        }, options);

        var timer = null;

        $ele.find('.galeria-prev').on('click', function() {
            states.push(states.shift());
            move();
        });

        $ele.find('.galeria-next').on('click', function() {
            states.unshift(states.pop());
            move();
        });

        $(window).on('resize', function() {
            states = getStates();
            move();
        });

        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

        function next() {
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }

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
            } else if (window.innerWidth <= 810) {
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
                    { $zIndex: 1, width: 120, height: 150, top: 69, left: 134, $opacity: 0.2 },
                    { $zIndex: 2, width: 130, height: 170, top: 59, left: 0, $opacity: 0.5 },
                    { $zIndex: 3, width: 170, height: 218, top: 35, left: 110, $opacity: 0.7 },
                    { $zIndex: 4, width: 224, height: 288, top: 0, left: 263, $opacity: 1 },
                    { $zIndex: 3, width: 170, height: 218, top: 35, left: 470, $opacity: 0.7 },
                    { $zIndex: 2, width: 130, height: 170, top: 59, left: 620, $opacity: 0.5 },
                    { $zIndex: 1, width: 120, height: 150, top: 69, left: 500, $opacity: 0.2 }
                ];
            }
        }
    }
})(jQuery);
