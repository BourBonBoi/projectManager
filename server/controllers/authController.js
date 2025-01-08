const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
exports.loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Ищем пользователя в базе данных по email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        // Проверяем, совпадает ли пароль
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        // Генерируем JWT токен
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Отправляем токен обратно
        res.json({ token, message: 'Авторизация успешна' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере', error: error.message });
    }
};
