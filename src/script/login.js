// añadimos listeners para validar campos al escribir
document.getElementById("usernameLogin").addEventListener("input", validarUsernameLogin);

// FUNCION PARA VALIDAR EL NOMBRE DE USUARIO
function validarUsernameLogin() {
    const usernameLogin = document.getElementById("usernameLogin").value;
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const errorUsernameLogin = document.getElementById("error-usernameLog");

    // verificar si el usuario existe o si tiene menos de 3 caracteres
    if (usernameLogin.length < 3 || !usuarios[usernameLogin]) {
        errorUsernameLogin.style.display = "flex";
    } else {
        errorUsernameLogin.style.display = "none";
    }
}

// FUNCION PARA INICIAR SESION
function validarLogin() {
    const usernameLogin = $("#usernameLogin").val();
    const passwordLogin = $("#passwordLogin").val();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (!usuarios[usernameLogin]) {
        alert("No hay datos almacenados. Por favor, regístrate primero.");
        return;
    }

    if (usuarios[usernameLogin].password === passwordLogin) {
        alert("Inicio de sesión exitoso.");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUser", usernameLogin);

        $("#login-form")[0].reset(); // resetear formulario
        $('#login-popup-id').hide(); // ocultar popup de login

        // si el usuario inicia sesion ocultamos los botones de inicio de sesion y registro
        $("#login-button").hide();
        $("#register-button").hide();

        // mostrar la imagen de perfil si existe
        if (usuarios[usernameLogin].foto) {
            $('#perfil-imagen').attr('src', usuarios[usernameLogin].foto);
        }
        $("#perfil-img").show();
    } else {
        alert("Contraseña incorrecta.");
    }
}


// FUNCIONES PARA EL POPUP DE INICIO DE SESION
// funcion prar cerrar el inicio de sesion
function cerrarPopupLog() {
    if (confirm("¿Seguro que quieres cancelar el inicio de sesión?")) {
        document.getElementById("login-form").reset(); // se resetea el formulario
        document.getElementById('login-popup-id').style.display = 'none';
    }
}

// funcion para limpiar los campos del formulario de inicio de sesion
function limpiarCamposLog() {
    if (confirm("¿Seguro que quieres limpiar todos los datos del formulario?")) {
        document.getElementById("login-form").reset(); //se resetea el fomrulario
    }
}

// funcion para aunque el usuario recarge la pagina, si sigue la sesion iniciada se queda
$(document).ready(function() {
    // Verificar si el usuario ha iniciado sesión
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (isLoggedIn && loggedInUser) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        // oculta los botones de Iniciar Sesion y Registrarse
        $("#login-button").hide();
        $("#register-button").hide();

        // muestra la imagen de perfil si existe, si no, mostrar una imagen por defecto
        if (usuarios[loggedInUser] && usuarios[loggedInUser].foto) {
            $('#perfil-imagen').attr('src', usuarios[loggedInUser].foto);
        }
        $("#perfil-img").show();
    }
});
