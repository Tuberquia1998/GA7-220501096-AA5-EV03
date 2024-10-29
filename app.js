require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
const userRoutes = require('./routes/user'); // Asegúrate de usar el nombre de archivo que ya tienes en `routes`
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
