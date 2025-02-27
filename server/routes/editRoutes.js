const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/avatars'); // Папка для сохранения изображений
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Генерация уникального имени для файла
    }
});

const upload = multer({ storage: storage });

// Роут для редактирования профиля
router.put('/profile', upload.single('avatar'), async (req, res) => {
    const { username, position, role } = req.body;
    const userId = req.user.id; // предполагаем, что в req.user есть данные о текущем пользователе

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Обновляем только те поля, которые были переданы
        if (username) user.username = username;
        if (position) user.position = position;
        if (req.file) user.avatar = req.file.path; // Если есть файл, обновляем путь к аватару
        if (role && req.user.role === 'admin') user.role = role; // Администратор может изменить роль

        await user.save();
        res.json({ message: 'Профиль обновлен успешно', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
