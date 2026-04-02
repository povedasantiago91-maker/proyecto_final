console.log("js funcionando");
document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    console.log("Formulario enviado");

    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
        alert("Las contraseñas no coinciden");
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
        alert(data);
        window.location.href = "iniciar_sesion.html";
    });
});