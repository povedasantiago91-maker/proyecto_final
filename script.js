document.addEventListener("DOMContentLoaded", function () {

    // 🔥 CARGAR NAVBAR
    const navbar = document.getElementById("navbar");

    if (navbar) {
        fetch("navbar.html")
        .then(res => res.text())
        .then(data => {
            navbar.innerHTML = data;

            // 👉 IMPORTANTE: ejecutar después de cargar navbar
            cargarUsuario();
            actualizarCarrito();
        });
    }

    // 🔥 CARGAR FOOTER
    const footer = document.getElementById("footer");

    if (footer) {
        fetch("footer.html")
        .then(res => res.text())
        .then(data => footer.innerHTML = data);
    }

});


// 👤 MOSTRAR USUARIO (SOLO PARTE DINÁMICA)
function cargarUsuario() {
    const menu = document.getElementById("menuUsuario");

    if (!menu) return;

    fetch("/usuario", {
        credentials: "include"
    })
    .then(res => res.json())
    .then(user => {

        console.log("Usuario:", user);

        if (user) {
            menu.innerHTML = `
                <li class="nav-item">
                    <span class="nav-link">👤 Hola, ${user.nombre}</span>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="logout()">Cerrar sesión</a>
                </li>
            `;
        } else {
            menu.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="iniciar_sesion.html">Iniciar Sesión</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="registrarse.html">Registrate</a>
                </li>
            `;
        }

    });
}


// 🔥 ACTUALIZAR CONTADOR (ya lo tienes pero lo reforzamos)
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("contadorCarrito");

    if (contador) {
        contador.textContent = carrito.length;
    }
}

// 🔥 ESCUCHAR CAMBIOS EN TIEMPO REAL
window.addEventListener("storage", () => {
    actualizarCarrito();
});

// 🔥 ACTUALIZAR CADA VEZ QUE CAMBIE EL DOM
setInterval(actualizarCarrito, 500);


// 🚪 LOGOUT
function logout() {
    fetch("/logout", {
        credentials: "include"
    })
    .then(() => {
        window.location.href = "iniciar_sesion.html";
    });
}