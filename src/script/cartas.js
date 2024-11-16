// FUNCION PARA ENVIAR UNA CARTA EN EL FORMULARIO
function enviarCarta() {
    // verificamos si el usuario ha iniciado sesion bien en la pagina
    if (!localStorage.getItem('isLoggedIn')) {
        alert("Debes iniciar sesión para enviar una carta.");
        return;
    }
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("No se encontraron datos del usuario. Por favor, inicia sesión nuevamente.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    const userData = usuarios[loggedInUser];
    if (!userData) {
        alert("No se encontraron datos del usuario. Por favor, inicia sesión nuevamente.");
        return;
    }

    // obtenemos los valores del formulario para enviarselo a papa noel
    const nombre = document.getElementById("nombreCarta").value;
    const email = document.getElementById("emailCarta").value;
    const ciudad = document.getElementById("ciudadCarta").value;
    const pais = document.getElementById("paisCarta").value;
    const cartaContenido = document.getElementById("carta").value;

    // checkeamos si el correo es el mismo del usuario que ha iniciado sesion
    if (email !== userData.email) {
        alert("El correo electrónico no coincide con el registrado. Debes usar el mismo correo para enviar la carta.");
        return;
    }

    // creamos la carta como un objeto, para despues meterlo dentro del usuario que ha iniciado sesion
    const nuevaCarta = {
        nombre: nombre,
        email: email,
        ciudad: ciudad,
        pais: pais,
        contenido: cartaContenido,
    };

    // añadimos la carta a la lista del usuario que ha iniciado sesion
    if (!userData.cartas) {
        userData.cartas = []; // si no hay cartas creamos la lista
    }
    userData.cartas.push(nuevaCarta); // pusheamos la nueva carta 

    // guardamos los datos actualizados en el local storage
    usuarios[loggedInUser] = userData;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Tu carta ha sido enviada exitosamente a Papá Noel.");

    // finalmente limpiamos el formulario para que el usuario pueda enviar otra carta
    document.getElementById("nombreCarta").value = "";
    document.getElementById("emailCarta").value = "";
    document.getElementById("ciudadCarta").value = "";
    document.getElementById("paisCarta").value = "";
    document.getElementById("carta").value = "";
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarCartas();
});

// FUNCION PARA VER LAS CARTAS DEL USUARIO QUE HA INICIADO SESION
function mostrarCartas() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    // checkeamos si el usuario ha iniciado sesion correctamente
    if (!loggedInUser || !usuarios[loggedInUser]) {
        alert("No se encontraron datos del usuario. Por favor, inicia sesión nuevamente.");
        return;
    }

    // obtenemos los datos del usuario que ha iniciado sesion
    const userData = usuarios[loggedInUser];
    const $contenedorCartas = $('#contenedor-cartas');
    const $cartasList = $('#cartas-list');
    const $cartasPopup = $('#cartas-popup-id');

    // limpiamos la lista de cartas antes de mostrar las nuevas
    $cartasList.empty();

    // si el usuario no ha enviado ninguna carta
    if (!userData.cartas || userData.cartas.length === 0) {
        $contenedorCartas.show();
    }
    
    // si el usuario ha enviado cartas
    else {
        $contenedorCartas.hide(); // limpiamos el contenedor de cartas
        userData.cartas.forEach((carta, index) => {
            const numeroFoto = Math.floor(Math.random() * 3) + 1; // para la decoración (escoge una decoracion del 1 al 3)

            // crear un nuevo html para cada carta
            const cartaItem = `
                <article class="carta" id="carta-${index}" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondrop="allowDrop(event)">
                    <header class="icon-container">
                        <img src="${userData.foto}" alt="Foto Perfil" class="icon">
                        <div class="nombre-email"> <!-- jaja al final lo he cambiado porque no me gustaba que se viera en dos lineas -->
                            <h5>${carta.nombre},</h5> 
                            <h6>${carta.email}</h6>
                        </div>
                    </header>
                    <p>${carta.contenido}</p>
                    <footer class="icon-decoration">
                        <p>${carta.ciudad}, ${carta.pais}</p>
                        <img src="images/sobre${numeroFoto}.svg" alt="sobre" class="decoration">
                    </footer>
                    <div class="button-container">
                        <button onclick="eliminarCarta(${index})" class="borrarbtn">Borrar</button>
                    </div>
                </article>
            `;

            // añadimos la carta a la lista
            $cartasList.append(cartaItem);
        });
    }

    // mostrar el pop-up
    $cartasPopup.show();
}

// FUNCION PARA ELIMINAR UNA CARTA
function eliminarCarta(index) {
    if (confirm("¿Estás seguro de que deseas eliminar esta carta?")) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

        // checkeamos si el usuario ha iniciado sesion correctamente
        if (loggedInUser && usuarios[loggedInUser] && usuarios[loggedInUser].cartas) {
            usuarios[loggedInUser].cartas.splice(index, 1); // eliminamos la carta :(
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        // actualizar el pop-up después de eliminar la carta
        mostrarCartas();
    }
}

// FUNCIONES PARA DRAG AND DROP DE LAS CARTAS
function drag(e) {
    e.dataTransfer.setData("cartaId", e.target.id); 
}

function drop(e) {
    e.preventDefault();
    
    const draggedCartaId = e.dataTransfer.getData("cartaId"); // obtenemos el id de la carta que estamos arrastrando
    // checkeamos si hemos conseguido un id bueno
    if (!draggedCartaId) {
        return; 
    }
    const draggedElement = document.getElementById(draggedCartaId); // obtenemos el elemento de la carta que estamos arrastrando
    const dropZone = $(e.target).closest('.carta'); // asegurarse de que el drop ocurra en una carta y no en su contenido

    if (dropZone.length && draggedElement !== dropZone[0]) {
        // guardamos el html de las cartas origniales
        const draggedElementHTML = $(draggedElement).html();
        const dropZoneHTML = dropZone.html();

        // intercambiamos el contenido de las cartas
        $(draggedElement).html(dropZoneHTML);
        dropZone.html(draggedElementHTML);
    }
    // en esta funcion no se cambia el index de cada carta en el local storage (no se si hay que hacerlo asi)
}

function allowDrop(e) {
    e.preventDefault();
}


// funcion para cerrar el popup de las cartas
function cerrarCartas() {
    document.getElementById('cartas-popup-id').style.display = 'none';
}