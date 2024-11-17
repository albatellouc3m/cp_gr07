// FUNCIONES PARA VERIFICAR QUE EL USUARIO SE ESTA REGISTRANDO CORERCTAMENTE Y SI NO MUESTRA ERRORES
// Validar el formulario en tiempo real
document.getElementById("username").addEventListener("input", validarUsername);
document.getElementById("password").addEventListener("input", validarPassword);
document.getElementById("password2").addEventListener("input", validarPasswordsMatch);
document.getElementById("email").addEventListener("input", validarEmail);

// Función para validar el username
function validarUsername() {
    const username = document.getElementById("username").value;
    const errorUsername = document.getElementById("error-username");

    if (username.length < 3) {
        errorUsername.style.display = "flex";
    } else {
        errorUsername.style.display = "none";
    }
}

// Función para validar la contraseña
function validarPassword() {
    const password = document.getElementById("password").value;
    const errorPass1 = document.getElementById("error-pass1");
    const errorPass2 = document.getElementById("error-pass2");
    const errorPass3 = document.getElementById("error-pass3");
    const errorPass4 = document.getElementById("error-pass4");
    const errorPass5 = document.getElementById("error-pass5");

    // Resetear todos los errores al inicio
    errorPass1.style.display = "none";
    errorPass2.style.display = "none";
    errorPass3.style.display = "none";
    errorPass4.style.display = "none";
    errorPass5.style.display = "none";

    // Verificar cada condición de la contraseña y mostrar el error correspondiente
    if (password.length < 12) {
        errorPass1.style.display = "flex";
    }
    if (!/[A-Z]/.test(password)) {
        errorPass2.style.display = "flex";
    }
    if (!/[a-z]/.test(password)) {
        errorPass3.style.display = "flex";
    }
    if (password.replace(/[^0-9]/g, "").length < 2) {
        errorPass4.style.display = "flex";
    }
    if (!/\W/.test(password)) {
        errorPass5.style.display = "flex";
    }
}

// Función para validar que las contraseñas coinciden
function validarPasswordsMatch() {
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const errorPass6 = document.getElementById("error-pass6");

    if (password !== password2) {
        errorPass6.style.display = "flex";
    } else {
        errorPass6.style.display = "none";
    }
}

// Función para validar el email
function validarEmail() {
    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorEmail = document.getElementById("error-email");

    if (!emailRegex.test(email)) {
        errorEmail.style.display = "flex";
    } else {
        errorEmail.style.display = "none";
    }
}


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

