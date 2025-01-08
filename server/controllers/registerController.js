const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Проверка, существует ли уже пользователь с таким email
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        // Создание нового пользователя
        const newUser = new User({
            username,
            email,
            password
        });

        // Сохранение пользователя в базе данных
        await newUser.save();

        // Генерация токена (если требуется)
        console.log(process.env.SECRET_KEY); // Это должно вывести ваш секретный ключ

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(201).json({
            message: 'Пользователь успешно зарегистрирован',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};