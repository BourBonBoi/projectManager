const express = require('express');
const { registerUser } = require('../controllers/registerController');
const router = express.Router();

// Маршрут для регистрации
router.post('/', registerUser);  // Используем registerUser как callback

module.exports = router;
