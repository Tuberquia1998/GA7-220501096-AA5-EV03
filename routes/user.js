const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Crear usuario (Registro)
router.post('/register', async (req, res) => {
    const { nombre, apellidos, telefono, direccion, correo, contrasena, confirmarContrasena } = req.body;

    if (contrasena !== confirmarContrasena) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    try {
        const nuevoUsuario = new User({ nombre, apellidos, telefono, direccion, correo, contrasena });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const usuario = await User.findOne({ correo });
        if (!usuario || usuario.contrasena !== contrasena) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer usuario
router.get('/:id', async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
    try {
        const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
