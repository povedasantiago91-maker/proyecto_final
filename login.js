document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

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
        alert(data);

        if (data === "Login correcto") {
            window.location.href = "index.html";
        }
    });
});