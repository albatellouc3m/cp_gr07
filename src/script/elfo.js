let popupAbierto = null; // constante que nos ayuda a que el popup se mantenga abierto jeje

// FUNCION QUE MUESTRA EL POPUP CON LOS ESTILOS DEL ELFO (para cada id)
function mostrarPopupEstilos(id, event) {
    event.stopPropagation(); // evita que se cierre inmediatamente

    cerrarPopup(); // cerramos cualquier popup abierto previamente

    // buscamos el popup correspondiente al ID
    const popup = document.getElementById(`estilos-popup-${id}`);
    if (popup) {
        popup.classList.add('visible'); // si existe muestra ese popup
        popupAbierto = popup; // almacena el popup que tenemos abierto en la constante para que no se cierre al hacer click dentro, que se cierra si solo es fuera el click

        // event listener de clicks en el documento para cerrar el popup si el click es fuera
        document.addEventListener('click', cerrarPopupSiFuera);
    } else {
        console.error(`Popup con ID estilos-popup-${id} no encontrado.`); // por si acaso abe
    }
}

// FUNCION QUE CIERRA EL POPUP SI SE HACE CLICK FUERA DE ÉL
function cerrarPopupSiFuera(event) {
    if (popupAbierto && !popupAbierto.contains(event.target)) {
        cerrarPopup();
    }
}

// CIERRA EL POPUP
function cerrarPopup() {
    if (popupAbierto) {
        popupAbierto.classList.remove('visible'); // cierra el popup
        popupAbierto = null; // actualizamos el valro de esta variable
        document.removeEventListener('click', cerrarPopupSiFuera); // elimina el evento de ante
    }
}


// FUNCION PARA SELECCIONAR UN ESTILO PARA EL ELFO
function seleccionarEstilo(estilo) {
    const [categoria, numero] = estilo.match(/([a-z]+)(\d+)/).slice(1);  // usamos una expresión regular para separar las letras ([a-z]+) y los números (\d+), y desestructuramos el resultado en dos variables.
    const elementoId = `elfo-${categoria}`; // con la categoria que hemos obtenido antes 
    const elemento = document.getElementById(elementoId);

    if (elemento) {
        if (estilo === 'reiniciar') {
            elemento.style.display = 'none';
        } else {
            elemento.src = `images/elfo/${estilo}.svg`; // ponemos la fotico del estilo seleccionado 
            elemento.style.display = 'block';
        }
    } else {
        console.error(`Elemento con ID ${elementoId} no encontrado.`);
    }

    cerrarPopup();
}

// Abrir el popup para introducir el nombre del elfo
function mostrarPopupNombre() {
    // Reiniciar el contenido del campo de entrada
    document.getElementById('nombre-elfo').value = '';
    
    document.getElementById('popup-nombre-elfo').style.display = 'block';
}

// Cerrar el popup de nombre del elfo
function cerrarPopupNombre() {
    document.getElementById('popup-nombre-elfo').style.display = 'none';
}

// FUNCION PARA GUARDAR ELFOS EN MI PERFIL
function guardarElfo() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (!loggedInUser || !usuarios[loggedInUser]) {
        alert("No se puede guardar el elfo porque no hay ningún usuario logueado.");
        return;
    }

    // Recolectar los datos del elfo
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

    // Guardar el elfo temporalmente hasta que se asigne un nombre
    usuarios[loggedInUser].elfoTemporal = partesElfo;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostrar el popup para el nombre del elfo
    mostrarPopupNombre();
}

// Guardar el nombre del elfo y actualizar los datos
function guardarNombreElfo() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    const nombreElfo = document.getElementById('nombre-elfo').value.trim();
    if (!nombreElfo) {
        alert("Por favor, introduce un nombre para tu elfo.");
        return;
    }

    if (!loggedInUser || !usuarios[loggedInUser] || !usuarios[loggedInUser].elfoTemporal) {
        alert("No se encontró el elfo a guardar. Inténtalo nuevamente.");
        return;
    }

    const elfo = {
        nombre: nombreElfo,
        partes: usuarios[loggedInUser].elfoTemporal
    };

    if (!usuarios[loggedInUser].elfos) {
        usuarios[loggedInUser].elfos = [];
    }

    usuarios[loggedInUser].elfos.push(elfo);
    delete usuarios[loggedInUser].elfoTemporal;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cerrarPopupNombre();
    alert(`¡Elfo "${nombreElfo}" guardado con éxito!`);

    reiniciarEstilos('guardado');
}


// FUNCION PARA REINICIAR LOS ESTILOS DE LOS ELFOS (dependiendo de la categoria)
function reiniciarEstilos(id) {
    if (id == 'reiniciar'){
        confirm('¿Estás seguro de que deseas reiniciar todos los estilos?');
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

    if (id == 'cara'){
        document.getElementById('elfo-ojos').src ='images/elfo/ojos2.svg';
        document.getElementById('elfo-pecas').src ='images/elfo/pecas1.svg'; 
        document.getElementById('elfo-nariz').src ='images/elfo/nariz1.svg';
        document.getElementById('elfo-boca').style ='display:none';
    }

    if (id == 'camiseta'){
        document.getElementById('elfo-camiseta').src ='images/elfo/camiseta.svg';  
    }

    if (id == 'pantalon'){
        document.getElementById('elfo-pantalon').src ='images/elfo/pantalon.svg';
    }

    if (id == 'accesorios'){
        document.getElementById('elfo-gorro').src ='images/elfo/gorro.svg';
        document.getElementById('elfo-gafas').style ='display:none';
    }

    if (id == 'guardado'){
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

}
