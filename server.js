const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// 🔗 Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234", // tu contraseña
    database: "vitalora"
});

db.connect(err => {
    if (err) {
        console.log("Error conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});


// 📝 REGISTRO
app.post("/registro", (req, res) => {
    const { nombre, correo, password } = req.body;

    const sql = "INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)";

    db.query(sql, [nombre, correo, password], (err, result) => {
        if (err) {
            console.log("err");
            return res.send("Error al registrar");
        }
        res.send("Usuario registrado");
    });
});


// 🔐 LOGIN
app.post("/login", (req, res) => {
    const { correo, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";

    db.query(sql, [correo, password], (err, result) => {
        if (err) return res.send("Error");

        if (result.length > 0) {
            res.send("Login correcto");
        } else {
            res.send("Datos incorrectos");
        }
    });
});


// 🚀 SERVIDOR
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});