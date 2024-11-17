// Función para mostrar el popup para abrir el regalo
function mostrarPopupAbrirRegalo(dia) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const openGiftPopup = document.getElementById('open-gift-popup');

    // Verificar si el usuario ha iniciado sesión
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Por favor, inicia sesión para abrir el regalo.");
        return;
    }

    // Verificar si se ha llegado al día para abrir el regalo
    if (dia <= currentDay) {
        // Obtener los datos del usuario del localStorage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        let regalosRecogidos = usuarios[loggedInUser].regalosRecogidos || [];

        // Verificar si el regalo ya fue abierto
        if (regalosRecogidos.includes(dia)) {
            alert("Ya has recogido este regalo.");
            return;
        }

        // Mostrar popup para abrir regalo
        openGiftPopup.style.display = 'block';
        openGiftPopup.setAttribute('data-dia', dia); // Guardamos el día actual para usarlo en abrirRegalo
    } else {
        // Mostrar un temporizador si aún no es el día
        const timeLeft = new Date(currentDate.getFullYear(), 11, dia) - currentDate;
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

        alert(`Aún no es el día para abrir este regalo. Tiempo restante: ${daysLeft} días, ${hoursLeft} horas, ${minutesLeft} minutos y ${secondsLeft} segundos.`);
    }
}

// Función para abrir el regalo
function abrirRegalo() {
    const giftPopup = document.getElementById('gift-popup');
    const giftMessage = document.getElementById('gift-message');
    const openGiftPopup = document.getElementById('open-gift-popup');

    // Verificar si el usuario ha iniciado sesión
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Por favor, inicia sesión para abrir el regalo.");
        return;
    }

    // Obtener el día actual del popup
    const dia = parseInt(openGiftPopup.getAttribute('data-dia'));

    // Generar un regalo aleatorio
    const regalos = ["Un caramelo", "Un muñeco de nieve", "Una estrella brillante", "Un gorrito navideño", "Unas medias calentitas"];
    const regalo = regalos[Math.floor(Math.random() * regalos.length)];

    // Actualizar mensaje y mostrar el popup de regalo
    giftMessage.textContent = `¡Felicidades! Has recibido: ${regalo}`;
    giftPopup.style.display = 'block';

    // Añadir el regalo a la lista de regalos recogidos en localStorage para el usuario actual
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    let usuarioActual = usuarios[loggedInUser];

    if (!usuarioActual.regalosRecogidos) {
        usuarioActual.regalosRecogidos = [];
    }

    if (!usuarioActual.regalosRecogidos.includes(dia)) {
        usuarioActual.regalosRecogidos.push(dia);
    }

    usuarios[loggedInUser] = usuarioActual;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Cerrar el popup de abrir regalo
    openGiftPopup.style.display = 'none';
}

// Función para cerrar cualquier popup
function cerrarPopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Event listeners para cada día del calendario
document.querySelectorAll('.numero').forEach(numero => {
    numero.addEventListener('click', function () {
        const dia = parseInt(this.id.replace('numero', ''));
        mostrarPopupAbrirRegalo(dia);
    });
});

// Cerrar los popups al hacer clic fuera de ellos
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
