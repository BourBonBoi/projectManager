// В файле userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Роут для получения всех пользователей
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            console.log('Пользователи не найдены');
        }
        res.json(users);
    } catch (error) {
        console.error('Ошибка при запросе пользователей:', error);
        res.status(500).json({ message: 'Ошибка при получении пользователей' });
    }
});


module.exports = router;
