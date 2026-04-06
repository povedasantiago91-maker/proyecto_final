document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const mensaje = document.getElementById("mensaje");

            const data = {
                correo: document.getElementById("correo").value,
                password: document.getElementById("password").value
            };

            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.text())
            .then(data => {

                if (data === "Login correcto") {
                    mensaje.innerHTML = `
                        <div class="alert alert-success">${data}</div>
                    `;

                    // 🔥 REDIRECCIÓN INTELIGENTE
                    setTimeout(() => {
                        const params = new URLSearchParams(window.location.search);
                        const redirect = params.get("redirect");

                        window.location.href = redirect || "index.html";
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