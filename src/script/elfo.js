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

// Maneja la selección de un estilo
function seleccionarEstilo(estilo) {
    cerrarPopup(); // Cierra el popup actual
    if (estilo === 'reiniciar') {
        alert('Sin estilo seleccionado.');
        // Aquí puedes añadir la lógica para eliminar el estilo aplicado al elfo
    } else {
        alert(`Estilo seleccionado: ${estilo}`);
        // Aplica el estilo al elfo según el ID seleccionado
        document.getElementById('elfo-foto').src = `images/elfo/${estilo}.svg`;
    }
}


function reiniciarEstilos() {
    document.getElementById('elfo-foto').src = 'images/elfo/elfo.svg';
}
