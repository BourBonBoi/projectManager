const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Проверяем, существует ли уже пользователь с таким email
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        // Создаем нового пользователя
        const user = new User({
            username,
            email,
            password,
        });

        // Сохраняем пользователя в базе данных
        await user.save();

        // Создаем JWT токен
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Отправляем токен на клиент
        res.status(201).json({ token, message: 'Пользователь зарегистрирован успешно' });
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка на сервере', error: error.message });
    }
};