$(document).ready(function () {
    $(".cancion").click(function () {
        // Obtén la URL del vídeo del atributo data-video
        const videoURL = $(this).data("video");

        // Oculta las canciones y el personaje
        $(".contenedor-canciones").hide();
        $(".contenedor-personaje").hide();

        // Muestra el contenedor del vídeo e inserta el archivo de vídeo
        $(".contenedor-video").show();
        $("#karaoke-video").attr("src", videoURL);
        
    });
});

$(document).ready(function () {
    $(".cancion").click(function () {
        // Obtén la URL del vídeo del atributo data-video
        const videoURL = $(this).data("video");

        // Oculta las canciones y el personaje
        $(".contenedor-canciones").hide();
        $(".contenedor-personaje").hide();

        // Muestra el contenedor del vídeo e inserta el archivo de vídeo
        $(".contenedor-video").show();
        $("#karaoke-video").attr("src", videoURL);
    });

    // Evento para la flecha que regresa a la vista de las canciones
    $(".flecha").click(function () {
        // Muestra las canciones y el personaje
        $(".contenedor-canciones").show();
        $(".contenedor-personaje").show();

        // Oculta el contenedor del vídeo y detiene el vídeo
        $(".contenedor-video").hide();
        $("#karaoke-video").attr("src", ""); // Detiene el vídeo limpiando el src
    });
});
