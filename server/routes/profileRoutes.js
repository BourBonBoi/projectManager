const express = require('express');
const router = express.Router();

// Главная страница
router.get('/profile', (req, res) => {
    res.send('Welcome to profile');
});

module.exports = router;