const express = require("express");
const User = require("../models/date");
const router = express.Router();

// Ruta para crear una nuevo cita
router.post("/dates", async (req, res) => {
  try {
    const date = new User(req.body);
    await date.save();
    res.status(201).send(date);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para obtener todas les citas
router.get("/dates", async (req, res) => {
  try {
    const dates = await User.find();
    res.send(dates);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Ruta para obtener una cita por su ID
router.get("/dates/:id", async (req, res) => {
  try {
    const date = await User.findById(req.params.id);
    if (!date) {
      return res.status(404).send();
    }
    res.send(date);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Ruta para actualizar una cita por su ID
router.put("/dates/:id", async (req, res) => {
  try {
    const date = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!date) {
      return res.status(404).send();
    }
    res.send(date);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para eliminar una cita por su ID
router.delete("/dates/:id", async (req, res) => {
  try {
    const date = await User.findByIdAndDelete(req.params.id);
    if (!date) {
      return res.status(404).send();
    }
    res.send(date);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;