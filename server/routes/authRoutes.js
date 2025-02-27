const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');  // Подключаем контроллер

// Маршрут для логина
router.post('/login', loginUser);  // Привязываем функцию loginUser к POST запросу на /login

module.exports = router;
