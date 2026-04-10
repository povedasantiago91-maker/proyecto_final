const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const app = express();

// 🔧 MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secreto123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true solo en https
        httpOnly: true
    }
}));

// 🔗 CONEXIÓN A MYSQL
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

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/productos", (req, res) => {
    db.query("select*from productos", (err, result) => {
        if (err) return res.json([]);
        res.json(result);
    });
});

app.get("/coaches", (req, res) => {
    db.query("select*from coaches", (err, result) => {
        if(err) return res.json([]);
        res.json(result);
    });
});

// 📝 REGISTRO
app.post("/registro", (req, res) => {
    const { nombre, correo, password } = req.body;

    console.log("Datos recibidos:", req.body);

    const sql = "INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)";

    db.query(sql, [nombre, correo, password], (err, result) => {

        if (err) {
            console.log("ERROR SQL:", err);
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
        if (err) {
            console.log("ERROR LOGIN:", err);
            return res.send("Error");
        }

        if (result.length > 0) {

            // 🔥 GUARDAR SOLO DATOS NECESARIOS
            req.session.usuario = {
                id: result[0].id,
                nombre: result[0].nombre,
                correo: result[0].correo
            };

            res.send("Login correcto");

        } else {
            res.send("Datos incorrectos");
        }
    });
});


// 👤 OBTENER USUARIO LOGUEADO
app.get("/usuario", (req, res) => {
    if (req.session.usuario) {
        res.json(req.session.usuario);
    } else {
        res.json(null);
    }
});


// 🚪 LOGOUT
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.send("Sesion cerrada");
    });
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});