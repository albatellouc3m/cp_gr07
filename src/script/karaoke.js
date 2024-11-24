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
