// FUNCIÓN PARA MOSTRAR/OCULTAR EL MENÚ DROPDOWN GENERAL
function toggleDropdown(event) {
    event.stopPropagation(); // Detiene la propagación del evento para evitar que se oculte inmediatamente

    // data-dropdown del enlace
    const dropdownId = event.currentTarget.getAttribute('data-dropdown');
    if (!dropdownId) return;

    // seleccionar el dropdown correspondiente
    const dropdownMenu = document.getElementById(dropdownId);

    // cierra todos los otros menús desplegables
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(dropdown => {
        if (dropdown !== dropdownMenu && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    });

    // alternar la clase 'show' para animar el desplegable
    dropdownMenu.classList.toggle('show');
}

// Cerrar todos los menús dropdown si el usuario hace clic fuera de ellos
window.onclick = function() {
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
    });
};



// CONTADOR DE LA CUENTA ATRAS PAAR NAVIDAD :)))) (merry christmas guys)
// inicializamos la fecha limite
let countDownDate = new Date("Dec 24, 2025 23:59:59").getTime();

// funcion cuenta atras
let x = setInterval(function() {
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // output del resultado
  document.getElementById("countdown").innerHTML = days + "días " + hours + "h "
  + minutes + "min " + seconds + "seg ";
    
  // reemplazo del texto para cuando acabe la cuenta atrás
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "¡YA HA LLEGADO!";
    document.getElementById("textito").innerHTML = " ";
  }
}, 1000);




// FUNCION PARA CERRAR SESION
function cerrarSesion() {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        localStorage.setItem("isLoggedIn", false);
        localStorage.removeItem('loggedInUser');
        alert("Has cerrado sesión exitosamente.");
        location.reload(); // recargar la página para volver al estado inicial
    }
}