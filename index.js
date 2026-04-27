const express = require('express');
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('API CRUD funcionando ');
  });
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("API corriendo"));