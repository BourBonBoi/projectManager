const express = require('express');
const router = express.Router();

// Главная страница
router.get('/', (req, res) => {
    res.send('Welcome to Project Manager API');
});

module.exports = router;