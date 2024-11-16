// FUNCION PARA REGISTRAR AL USUARIO, CON SUS HIJAS Y SU FOTITIO FIREEEEEEEEEEEEE
function registrarUsuario() {
    // primero cogemos todos los valores de los campos del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const email = document.getElementById("email").value;

    // checkeamos que todos los campos estén completos
    if (!username || !password || !password2 || !email) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // checkeamos que las contraseñas tengan un buen formato (12 caracteres, 1 M, 1 m, 2 num, 1 simbolo)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2})(?=.*\W{1}).{12,}$/;
    if (!passwordRegex.test(password)) {
        alert("La contraseña debe tener al menos 12 caracteres, una mayúscula, una minúscula, dos números y un símbolo.");
        return;
    }

    // checkeamos que las dos contraseñas coinciden
    if (password !== password2) {
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        return;
    }

    // checkeamos la longitud del username, ciudad y pais 
    if (username.length < 3) {
        alert("El nombre de usuario, ciudad y país deben tener al menos 3 caracteres.");
        return;
    }

    // checkeamos que el email tenga un formato correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, introduce un email válido.");
        return;
    }
    
    // checkeamos que el usuario no existe ya
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    if (usuarios){
        if (usuarios[username] === username) {
            alert("Ya hay un usuario registrado con este email. Por favor, inicia sesión.");
            return;
        }
    }
    const fotoURL = "./images/usuario.svg"; // Valor predeterminado si no sube una foto

    const nuevoUsuario = {
        username: username,
        password: password,
        email: email,
        cartas: [],
        foto: fotoURL
    };
    usuarios[username] = nuevoUsuario;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso.");
    document.getElementById('register-form').reset();
    document.getElementById('register-popup-id').style.display = 'none';
}


// FUNCIONES PARA EL POPUP DE REGISTRO
// funcion para cerrar el popup de registro
function cerrarPopupReg() {
    if (confirm("¿Seguro que quieres cancelar el registro?")) {
        document.getElementById("register-form").reset();
        document.getElementById('register-popup-id').style.display = 'none';
    }
}

// funcion para limpiar los campos del formulario de registro
function limpiarCamposReg() {
    if (confirm("¿Seguro que quieres limpiar todos los datos del formulario?")) {
        document.getElementById("register-form").reset();

    }
}

