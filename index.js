const express = require('express');
const app = express();

app.use(express.json());

// --------------------
// RUTA BASE
// --------------------
app.get('/', (req, res) => {
  res.send('API CRUD + Asistencia funcionando 🚀');
});

// --------------------
// CRUD PRODUCTOS (lo que ya tenías)
// --------------------
let productos = [];

// CREATE
app.post('/productos', (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).send("Nombre requerido");
  }
  productos.push(req.body);
  res.status(201).json(req.body);
});

// READ
app.get('/productos', (req, res) => {
  res.json(productos);
});

// READ ONE
app.get('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id == req.params.id);
  if (!producto) return res.status(404).send("No encontrado");
  res.json(producto);
});

// UPDATE
app.put('/productos/:id', (req, res) => {
  productos = productos.map(p =>
    p.id == req.params.id ? req.body : p
  );
  res.json(req.body);
});

// DELETE
app.delete('/productos/:id', (req, res) => {
  productos = productos.filter(p => p.id != req.params.id);
  res.send("Eliminado");
});


// --------------------
// NUEVO: SISTEMA DE ASISTENCIA (TU PROYECTO)
// --------------------

// Entidades
let trabajadores = [];
let turnos = [];
let asistencias = []; // Transacción


// --------------------
// TRABAJADORES
// --------------------
app.post('/trabajadores', (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).send("Nombre requerido");
  }
  trabajadores.push(req.body);
  res.json(req.body);
});

app.get('/trabajadores', (req, res) => {
  res.json(trabajadores);
});


// --------------------
// TURNOS
// --------------------
app.post('/turnos', (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).send("Nombre requerido");
  }
  turnos.push(req.body);
  res.json(req.body);
});

app.get('/turnos', (req, res) => {
  res.json(turnos);
});


// --------------------
// TRANSACCIÓN: REGISTRO DE ASISTENCIA
// --------------------
app.post('/asistencia', (req, res) => {
  const { trabajadorId, turnoId, ubicacion } = req.body;

  if (!trabajadorId || !turnoId) {
    return res.status(400).send("Datos incompletos");
  }

  const trabajador = trabajadores.find(t => t.id == trabajadorId);
  const turno = turnos.find(t => t.id == turnoId);

  if (!trabajador || !turno) {
    return res.status(404).send("Trabajador o turno no existe");
  }

  const registro = {
    trabajadorId,
    turnoId,
    ubicacion,
    fecha: new Date()
  };

  asistencias.push(registro);

  res.json({
    mensaje: "Asistencia registrada",
    data: registro
  });
});


// Ver asistencias
app.get('/asistencia', (req, res) => {
  res.json(asistencias);
});


// --------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("API corriendo"));