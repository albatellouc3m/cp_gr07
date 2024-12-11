$(document).ready(function () {
    $(".cancion").click(function () {
        // obtenemos la URL del vídeo del atributo data-video
        const videoURL = $(this).data("video");

        // ocultamos las canciones y el elfo
        $(".contenedor-canciones").hide();
        $(".contenedor-personaje").hide();

        // mostramos el contenedor del video y la flecha
        $(".contenedor-video").show();
        $("#karaoke-video").attr("src", videoURL);
        $(".flecha").show();
    });

    // cuando se haga click en la flecha, volvemos a la pagina inicial de las canciones
    $(".flecha").click(function () {
        // muestra otra vez las canciones y el elfo
        $(".contenedor-canciones").show();
        $(".contenedor-personaje").show();

        // ocultamos el contenedor del video y paramos el video
        $(".contenedor-video").hide();
        $(".flecha").hide();
        $("#karaoke-video").attr("src", ""); // para el video limpiando el src
    });
});
