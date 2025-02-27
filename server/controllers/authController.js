const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Логин пользователя
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Шаг 1: Найти пользователя по email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Пользователь с таким email не найден' });
        }

        // Шаг 2: Проверить, совпадает ли пароль
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        // Шаг 3: Генерация JWT токена
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username }, 
            'секретный_ключ', // секретный ключ для подписи токена
            { expiresIn: '1h' } // срок действия токена
        );

        // Шаг 4: Отправить токен в ответе
        res.json({
            message: 'Успешный вход',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере', error: error.message });
    }
};
