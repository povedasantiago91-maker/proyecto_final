document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("navbar");

    if (navbar) {
        fetch("navbar.html")
            .then(res => res.text())
            .then(data => {
                navbar.innerHTML = data;

                cargarUsuario();

                // 🔥 asegurar que el DOM del navbar ya existe
                setTimeout(() => {
                    actualizarCarrito();
                }, 50);
            });
    }

    const footer = document.getElementById("footer");

    if (footer) {
        fetch("footer.html")
            .then(res => res.text())
            .then(data => footer.innerHTML = data);
    }

});


// 👤 USUARIO
function cargarUsuario() {

    const menu = document.getElementById("menuUsuario");
    if (!menu) return;

    fetch("/usuario", { credentials: "include" })
        .then(res => res.json())
        .then(user => {

            if (user) {
            menu.innerHTML = `
                <li class="nav-item d-flex align-items-center">
                    <span class="nav-link mb-0">👤 Hola, ${user.nombre}</span>
                    <a class="nav-link ms-2" href="#" onclick="logout()">Cerrar sesión</a>
                </li>
            `;
            } else {
            menu.innerHTML = `
                <li class="nav-item d-flex align-items-center">
                    <a class="nav-link" href="iniciar_sesion.html">Iniciar Sesión</a>
                    <a class="nav-link ms-2" href="registrarse.html">Registrarse</a>
                </li>
            `;
            }

        });
}


// 🛒 CONTADOR CARRITO
function actualizarCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("contadorCarrito");

    if (!contador) return;

    contador.textContent = carrito.length;
}


// 🚪 LOGOUT
function logout() {
    fetch("/logout", { credentials: "include" })
        .then(() => {
            window.location.href = "iniciar_sesion.html";
        });
}