// primero almacenamos todos los regalos en el local storage para tenerlos más a mano
// si no pongo las N en mayúscula se ven al revés asi que aunque os de toc os jodeis calvas
function inicializarRegalos() {
    const regalos = [
        { nombre: "Web Papá Noel", imagen: "./images/regalos/portada.svg", descripcion: "Una página web de Papá Noel" },
        { nombre: "Chocolate", imagen: "./images/regalos/chocolate.svg", descripcion: "un chocolate bien rico de nuestros elfos" },
        { nombre: "ENtradas giNebras", imagen: "./images/regalos/ticket.svg", descripcion: "entradas para el concierto de la mejor banda del mundo" },
        { nombre: "ImaN", imagen: "./images/regalos/iman.svg", descripcion: "imán para ponerlo en la nevera y que te recuerde a la navidad" },
        { nombre: "Mayordomo", imagen: "./images/regalos/mayordomo.jpeg", descripcion: "Jeffrey te ayudará con las tareas de tu casa" },
        { nombre: "Bolso Luis VuittoN", imagen: "./images/regalos/luivui.jpg", descripcion: "Bolso perfecto para diva perfecta" },
        { nombre: "Robux", imagen: "./images/regalos/robux.jpeg", descripcion: "2000 robux para gastarte en el dress to impress" },
        { nombre: "barbie", imagen: "./images/regalos/barbiedreamhouse.jpeg", descripcion: "la casa de barbie para invitar a todos tus amigos" },
        { nombre: "amigos", imagen: "./images/regalos/amigos.jpeg", descripcion: "Un grupo de amigos para no pasar los viernes solo" },
        { nombre: "chayaNNe", imagen: "./images/regalos/chayanne.jpg", descripcion: "que tu madre se case con chayanne" },
        { nombre: "PuNtos carNet", imagen: "./images/regalos/puntos.png", descripcion: "1000 puntos de carnet de conducir para poder hacer el terrorista en la carretera" },
        { nombre: "Pato iNformático", imagen: "./images/regalos/pato.jpg", descripcion: "un patito informático super mono" },
        { nombre: "Peluca", imagen: "./images/regalos/peluca.jpeg", descripcion: "una peluca por si acaso te quedas calvo" },
        { nombre: "Hamburguesa", imagen: "./images/regalos/hamburguesa.jpeg", descripcion: "Una hamburguesa para que hoy comas como una reina" },
        { nombre: "CalcetiNes", imagen: "./images/regalos/calcetines.webp", descripcion: "calcetines dignos de una diva" },
        { nombre: "Muñeca", imagen: "./images/regalos/muñeca.jpg", descripcion: "Una muñeca para que te acompañe esas noches a solas" },
        { nombre: "Orejas", imagen: "./images/regalos/orejas.jpeg", descripcion: "Para disfrazarte de tu animal favorito" },
        { nombre: "Poster", imagen: "./images/regalos/chickentikka.png", descripcion: "chicken tikka masala" },
        { nombre: "Coche", imagen: "./images/regalos/coche.jpeg", descripcion: "Ya que no te tocó en la Ruleta de la Suerte te lo regala Papá Noel" },
        { nombre: "MaNsioN", imagen: "./images/regalos/mansion.jpeg", descripcion: "Una casa para que puedas invitar a tus nuevos amigos" },
        { nombre: "Casa Arbol", imagen: "./images/regalos/casaArbol.jpeg", descripcion: "Una casa en un arbol para ser Peter Pan y nunca envejecer" },
        { nombre: "Familia", imagen: "./images/regalos/familiaEstable.jpeg", descripcion: "La familia estable que nunca tuviste" },
        { nombre: "BalóN", imagen: "./images/regalos/balon.jpg", descripcion: "Balón de España para echar una pachangüita con los colegas" },
        { nombre: "Nota de Arquitectura", imagen: "./images/regalos/10.jpg", descripcion: "Un 10 en Arquitectura de Computadores" },
        { nombre: "Peluche", imagen: "./images/regalos/peluche.jpg", descripcion: "Un peluche de chayanne para alegrarte los días" },

    ];
    localStorage.setItem("regalosDisponibles", JSON.stringify(regalos)); // guardamos to
}

// FUNCION PARA MOSTRAR EL POPUP DE ABRIR REGALO
function mostrarPopupAbrirRegalo(dia) {
    const currentDate = new Date(); // fecha de today
    const currentDay = currentDate.getDate(); // dia de today
    const openGiftPopup = document.getElementById('open-gift-popup');

    // verificamos si el usuario ha iniciado sesión
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Por favor, inicia sesión para abrir el regalo.");
        return;
    }

    // ahora verificamos si ha llegado el día para poder abrir el regalo 
    if (dia <= currentDay) {
        // obtenemos los datos del usuario
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        let regalosRecogidos = usuarios[loggedInUser].regalosRecogidos || []; // lista de regalos que ha recogido

        // verificamos si el regalo ha sido abierto 
        if (regalosRecogidos.includes(dia)) {
            alert("Ya has recogido este regalo."); // jo
            return;
        }

        // si no se ha abierto el regalo todavía, abrimos le popup
        openGiftPopup.style.display = 'block';
        openGiftPopup.setAttribute('data-dia', dia); // guardamos el día actual para usarlo en la funcion abrirRegalo
    } else {
        // si todavía no es el día para abrir el regalo, mostramos un temporizador de cuanto tiempo queda para abrirlo
        const timeLeft = new Date(currentDate.getFullYear(), 11, dia) - currentDate;
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

        alert(`Aún no es el día para abrir este regalo. Tiempo restante: ${daysLeft} días, ${hoursLeft} horas, ${minutesLeft} minutos y ${secondsLeft} segundos.`);
    }
}

// FUNCION PARA ABRIR EL REGALO
function abrirRegalo() {
    const giftPopup = document.getElementById('gift-popup');
    const giftMessage = document.getElementById('gift-message');
    const giftImage = document.getElementById('gift-image');
    const openGiftPopup = document.getElementById('open-gift-popup');

    // verificamos si el usuario ha iniciado sesion
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Por favor, inicia sesión para abrir el regalo.");
        return;
    }

    // cogemos el dia (lo hemos guardado antes)
    const dia = parseInt(openGiftPopup.getAttribute('data-dia'));

    // cogemos los regalos disponibles que hay en local storage
    const regalos = JSON.parse(localStorage.getItem("regalosDisponibles"));

    // seleccionamos el regalo que toca ese dia
    const regalo = regalos[dia % regalos.length];

    // actualizamos el mensaje e imagen del regalo y mostrar el popup de regalo
    giftMessage.textContent = `¡Felicidades! Has recibido: ${regalo.nombre}`;
    giftImage.src = regalo.imagen; 
    giftPopup.style.display = 'block';

    // añadimos el regalo a la lista de regalos recogidos en localStorage para el usuario actual
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    let usuarioActual = usuarios[loggedInUser];

    // si no tiene lista se la creamos
    if (!usuarioActual.regalosRecogidos) {
        usuarioActual.regalosRecogidos = [];
    }

    // si no tiene ese regalo lo metemos
    if (!usuarioActual.regalosRecogidos.includes(dia)) {
        usuarioActual.regalosRecogidos.push(dia);
    }

    usuarios[loggedInUser] = usuarioActual;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // cerramos el popup de abrir regalo
    openGiftPopup.style.display = 'none';
}

// FUNCION PARA CERRAR EL POPUP
function cerrarPopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// inicializamos to
window.onload = function () {
    inicializarRegalos();

    // event listeners para cada día del calendario (click)
    document.querySelectorAll('.numero').forEach(numero => {
        numero.addEventListener('click', function () {
            const dia = parseInt(this.id.replace('numero', ''));
            mostrarPopupAbrirRegalo(dia);
        });
    });

    // cerramos los popups al hacer click fuera
    window.onclick = function (event) {
        const openGiftPopup = document.getElementById('open-gift-popup');
        const giftPopup = document.getElementById('gift-popup');

        if (event.target == openGiftPopup) {
            openGiftPopup.style.display = 'none';
        }
        if (event.target == giftPopup) {
            giftPopup.style.display = 'none';
        }
    };
};
