// FUNCIÓN PARA PREVISUALIZAR LA IMAGEN DE PERFIL
function previewImagePerfil(event) {
    const reader = new FileReader();

    reader.onload = function () {
        $('#profile-edit-foto').attr('src', reader.result); // actualizar la imagen previsualizada en el perfil
    };

    if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    } else {
        $('#profile-edit-foto').attr('src', 'images/foto-usuario.svg'); // imagen por defecto si no se selecciona ninguna
    }
}

// FUNCIÓN PARA SUBIR FOTO DE PERFIL
function subirFoto(event) {
    event.preventDefault(); // Evita la recarga de la página
    event.stopPropagation(); // Evita que el clic cierre el dropdown
    document.getElementById('profile-edit-foto-input').click(); // Abre el selector de archivos
}

// FUNCIÓN PARA ELIMINAR FOTO DE PERFIL
function eliminarFotoPerfil() {
    // Confirmar si el usuario realmente quiere eliminar la foto de perfil
    if (confirm("¿Estás seguro de que quieres eliminar tu foto de perfil?")) {
        // Restablecer la imagen al valor predeterminado
        document.getElementById('profile-edit-foto').src = './images/foto-usuario.svg';
        
        // Actualizar el almacenamiento local para que la foto predeterminada se refleje en futuras sesiones
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
            if (usuarios[loggedInUser]) {
                usuarios[loggedInUser].foto = './images/usuario.svg';
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }
        }
    }
}


// FUNCION PARA MOSTRAR EL PERFIL DEL USUARIO
function mostrarPerfil() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (!loggedInUser || !usuarios[loggedInUser]) {
        alert("No hay datos de usuario disponibles.");
        return;
    }

    const userData = usuarios[loggedInUser];

    // rellenamos los campos del formuario con los datos del usuario
    $('#profile-edit-foto').attr('src', userData.foto || 'images/foto-usuario.svg');
    $('#edit-username').val(userData.username);
    $('#edit-password').val(userData.password);
    $('#edit-email').val(userData.email);
}

// FUNCION PARA GUARDAR LOS CAMBIOS DEL PERFIL
function guardarCambiosPerfil() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (!loggedInUser || !usuarios[loggedInUser]) {
        alert("No se encontraron datos del usuario. Por favor, inicia sesión nuevamente.");
        return;
    }

    // actualizar los datos del usuario con los nuevos valores
    const userData = usuarios[loggedInUser];
    userData.foto = $('#profile-edit-foto').attr('src');
    userData.username = $('#edit-username').val();
    userData.password = $('#edit-password').val();
    userData.email = $('#edit-email').val();

    // verificar si todos los campos son válidos
    if (!userData.username || !userData.password || !userData.email) {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    if (userData.username.length < 3) {
        alert("El nombre de usuario, ciudad y país deben tener al menos 3 caracteres.");
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2})(?=.*\W{1}).{12,}$/;
    if (!passwordRegex.test(userData.password)) {
        alert("La contraseña debe tener al menos 12 caracteres, una mayúscula, una minúscula, dos números y un símbolo.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        alert("Por favor, introduce un email válido.");
        return;
    }

    // guardar los datos actualizados del usuario en localStorage
    usuarios[loggedInUser] = userData;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Cambios guardados con éxito.");

    // actualizar la imagen de perfil si ha cambiado
    if (userData.foto) {
        $('#perfil-imagen').attr('src', userData.foto);
    }
}

// FUNCION QUE CARGA TO
window.onload = function() {
    mostrarPerfil();
    generarRegalos();
    cargarElfosGuardados(); 
}


if (sessionStorage.getItem('loadProfile') === 'true') {
    generarRegalos();
    mostrarPerfil(); // llamar a la función para mostrar el perfil del usuario
    sessionStorage.removeItem('loadProfile'); // limpiar la bandera para que no vuelva a cargar automáticamente
}


// FUNCIÓN PARA GENERAR LOS REGALOS EN LA SECCIÓN DE PERFIL
function generarRegalos() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    // verificar si el usuario está registrado y tiene regalos recogidos
    if (!loggedInUser || !usuarios[loggedInUser] || !usuarios[loggedInUser].regalosRecogidos) {
        document.getElementById('regalos-container').innerHTML = '<p>Descubre el calendario de Adviento escondido y abre cada día un regalo nuevo</p>';
        return;
    }

    const regalosRecogidos = usuarios[loggedInUser].regalosRecogidos;
    const regalosDisponibles = JSON.parse(localStorage.getItem('regalosDisponibles')) || [];
    const regalosContainer = document.getElementById('regalos-container');

    // ordernar los regalos (no sabia que se podia hecer asi lol)
    regalosRecogidos.sort((a, b) => a - b);

    // limpiar el contenedor por si acaso 
    regalosContainer.innerHTML = '';

    // generar los regalos abiertos por el usuario
    regalosRecogidos.forEach(dia => {
        const regalo = regalosDisponibles[dia % regalosDisponibles.length]; // aqui se coge el regalo del dia
        const regaloDiv = document.createElement('div');
        regaloDiv.classList.add('regalo');

        regaloDiv.innerHTML = `
            <h1 class="regalo-dia">Día ${dia}</h1>
            <img src="${regalo.imagen}" alt="${regalo.nombre}" class="regalo-img">
            <h3 class="regalo-nombre">${regalo.nombre}</h3>
            <p class="regalo-descripcion">${regalo.descripcion}</p>
        `;

        regalosContainer.appendChild(regaloDiv);
    });
}


function toggleProfileDropdown(event) {
    event.preventDefault();
    event.stopPropagation(); // evita que el clic cierre el menú inmediatamente
    const profileDropdownMenu = document.getElementById("profile-dropdown-menu");
    profileDropdownMenu.style.display = profileDropdownMenu.style.display === "block" ? "none" : "block";
}


// event listener de clicks en el documento para cerrar el dropdown si el usuario hace click fuera del dropdpwm
document.addEventListener('click', function(event) {
    const profileDropdownMenu = document.getElementById("profile-dropdown-menu");
    const profileDropdownBtn = document.getElementById("profile-dropdown-btn");

    // si el dropdown está abierto y el click no fue en el botón ni en el menú, cierra el dropdown
    if (profileDropdownMenu.style.display === "block" &&
        event.target !== profileDropdownMenu &&
        event.target !== profileDropdownBtn &&
        !profileDropdownMenu.contains(event.target)) {
        profileDropdownMenu.style.display = "none";
    }
});

// FUNCION PARA MOSTRAR LOS ELFOS GUARDADOS EN EL PERFIL
function cargarElfosGuardados() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (!loggedInUser || !usuarios[loggedInUser]) {
        alert("No hay datos de usuario disponibles.");
        return;
    }

    const userElfos = usuarios[loggedInUser].elfos || [];
    const elfosContainer = document.getElementById('elfos-container');

    elfosContainer.innerHTML = '';

    if (userElfos.length === 0) {
        elfosContainer.innerHTML = '<p>No tienes elfos guardados.</p>';
        return;
    }

    userElfos.forEach((elfo, index) => {
        const elfoDiv = document.createElement('div');
        elfoDiv.classList.add('elfo-guardado');

        elfoDiv.innerHTML = `
            <div class="titulo"> 
                <button class="elfo-borrar" onclick="borrarElfo(${index})">
                    <img src="images/cerrar.svg" alt="Borrar elfo" class="borrar">
                </button>
            </div>
            <div class="elfo">
                ${elfo.partes.map(parte => `
                    <img src="${parte.src}" id="${parte.id}" alt="${parte.id}" class="elfo-imagen-things" style="display: ${parte.visible === false ? 'none' : 'block'};">
                `).join('')}
            </div>
            <h4 class="elfo-titulo">${elfo.nombre}</h4>
        `;

        elfosContainer.appendChild(elfoDiv);
    });
}

// FUNCION PARA BORRAR UN ELFO SELECCIONADO
function borrarElfo(index) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (!loggedInUser || !usuarios[loggedInUser]) {
        alert("No hay datos de usuario disponibles.");
        return;
    }

    const userElfos = usuarios[loggedInUser].elfos || []; 

    if (index < 0 || index >= userElfos.length) {
        alert("El índice del elfo es inválido.");
        return;
    }

    if (confirm("¿Estás seguro/a de que quieres borrar este elfo?")){
        // elimina el elfo del array
        userElfos.splice(index, 1); 

        // actualiza el local storage
        usuarios[loggedInUser].elfos = userElfos;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    cargarElfosGuardados();
}