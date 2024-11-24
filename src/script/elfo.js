let popupAbierto = null; // Almacena el popup visible actualmente

// Muestra el popup de estilos
function mostrarPopupEstilos(id, event) {
    event.stopPropagation(); // Detiene la propagación para evitar que se cierre inmediatamente

    cerrarPopup(); // Cierra cualquier popup abierto previamente

    // Busca el popup correspondiente al ID
    const popup = document.getElementById(`estilos-popup-${id}`);
    if (popup) {
        popup.classList.add('visible'); // Muestra el popup
        popupAbierto = popup; // Almacena el popup actualmente abierto

        // Escucha clics en el documento para cerrar el popup si el clic es fuera
        document.addEventListener('click', cerrarPopupSiFuera);
    } else {
        console.error(`Popup con ID estilos-popup-${id} no encontrado.`);
    }
}

// Cierra el popup si el clic ocurre fuera de él
function cerrarPopupSiFuera(event) {
    if (popupAbierto && !popupAbierto.contains(event.target)) {
        cerrarPopup();
    }
}

// Cierra el popup y elimina el evento global
function cerrarPopup() {
    if (popupAbierto) {
        popupAbierto.classList.remove('visible'); // Oculta el popup
        popupAbierto = null; // Limpia la referencia
        document.removeEventListener('click', cerrarPopupSiFuera); // Elimina el evento global
    }
}


// Función para seleccionar un estilo
function seleccionarEstilo(estilo) {
    const [categoria, numero] = estilo.match(/([a-z]+)(\d+)/).slice(1);
    const elementoId = `elfo-${categoria}`;
    const elemento = document.getElementById(elementoId);

    if (elemento) {
        if (estilo === 'reiniciar') {
            elemento.style.display = 'none';
        } else {
            elemento.src = `images/elfo/${estilo}.svg`;
            elemento.style.display = 'block';
        }
    } else {
        console.error(`Elemento con ID ${elementoId} no encontrado.`);
    }

    cerrarPopup();
}

function guardarElfo() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (!loggedInUser || !usuarios[loggedInUser]) {
        alert("No se puede guardar el elfo porque no hay ningún usuario logueado.");
        return;
    }

    const partesElfo = [
        { id: 'elfo-ojos', src: document.getElementById('elfo-ojos').src },
        { id: 'elfo-boca', src: document.getElementById('elfo-boca').src, visible: document.getElementById('elfo-boca').style.display !== 'none' },
        { id: 'elfo-pecas', src: document.getElementById('elfo-pecas').src },
        { id: 'elfo-camiseta', src: document.getElementById('elfo-camiseta').src },
        { id: 'elfo-pantalon', src: document.getElementById('elfo-pantalon').src },
        { id: 'elfo-gafas', src: document.getElementById('elfo-gafas').src, visible: document.getElementById('elfo-gafas').style.display !== 'none' },
        { id: 'elfo-gorro', src: document.getElementById('elfo-gorro').src },
        { id: 'elfo-nariz', src: document.getElementById('elfo-nariz').src },
        { id: 'elfo-piel', src: document.getElementById('elfo-piel').src }
    ];

    // Agrega el elfo al usuario actual
    if (!usuarios[loggedInUser].elfos) {
        usuarios[loggedInUser].elfos = [];
    }
    usuarios[loggedInUser].elfos.push(partesElfo);

    // Guarda los datos actualizados en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("¡El elfo ha sido guardado en tu perfil!");
}



function reiniciarEstilos() {
    confirm('¿Estás seguro de que deseas reiniciar los estilos?');
    document.getElementById('elfo-ojos').src ='images/elfo/ojos2.svg';
    document.getElementById('elfo-pecas').src ='images/elfo/pecas1.svg';
    document.getElementById('elfo-camiseta').src ='images/elfo/camiseta.svg';
    document.getElementById('elfo-pantalon').src ='images/elfo/pantalon.svg';
    document.getElementById('elfo-gorro').src ='images/elfo/gorro.svg';
    document.getElementById('elfo-nariz').src ='images/elfo/nariz1.svg';
    document.getElementById('elfo-piel').src ='images/elfo/cuerpo.svg';

    document.getElementById('elfo-boca').style ='display:none';
    document.getElementById('elfo-gafas').style ='display:none';
}
