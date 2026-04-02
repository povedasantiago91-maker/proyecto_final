document.addEventListener("DOMContentLoaded", function () {

    // 🔥 CARGAR NAVBAR
    const navbar = document.getElementById("navbar");

    if (navbar) {
        fetch("navbar.html")
        .then(res => res.text())
        .then(data => {
            navbar.innerHTML = data;

            // 👉 IMPORTANTE: cargar usuario DESPUÉS del navbar
            cargarUsuario();
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


// 👤 FUNCIÓN PARA MOSTRAR USUARIO
function cargarUsuario() {
    const menu = document.getElementById("menuUsuario");

    if (!menu) return;

    fetch("/usuario", {
        credentials: "include"
    })
    .then(res => res.json())
    .then(user => {

        console.log("Usuario:", user); // debug

        if (user) {
           menu.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
      <li class="nav-item"><a class="nav-link" href="coaches.html">Servicios</a></li>
      <li class="nav-item">
          <span class="nav-link">👤 Hola, ${user.nombre}</span>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="#" onclick="logout()">Cerrar sesión</a>
      </li>
  `;
        }

    });
}


// 🚪 LOGOUT
function logout() {
    fetch("/logout", {
        credentials: "include"
    })
    .then(() => {
        window.location.href = "iniciar_sesion.html";
    });
}