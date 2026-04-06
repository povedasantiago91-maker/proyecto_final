document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registroForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const mensaje = document.getElementById("mensaje");

            const password = document.getElementById("password").value;
            const confirm = document.getElementById("confirmPassword").value;

            // Validar contraseñas
            if (password !== confirm) {
                mensaje.innerHTML = `
                    <div class="alert alert-danger">Las contraseñas no coinciden</div>
                `;
                return;
            }

            const data = {
                nombre: document.getElementById("nombre").value,
                correo: document.getElementById("correo").value,
                password: password
            };

            fetch("/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.text())
            .then(data => {

                if (data === "Usuario registrado") {
                    mensaje.innerHTML = `
                        <div class="alert alert-success">${data}</div>
                    `;

                    setTimeout(() => {
                        window.location.href = "iniciar_sesion.html";
                    }, 1500);

                } else {
                    mensaje.innerHTML = `
                        <div class="alert alert-danger">${data}</div>
                    `;
                }

            });
        });
    }

});