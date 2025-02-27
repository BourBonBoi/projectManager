const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');
const path = require('path'); // Добавьте эту строку для импорта модуля path


console.log('SECRET_KEY:', process.env.SECRET_KEY);
console.log('MONGO_URI:', process.env.MONGO_URI); // Для проверки переменной с URI MongoDB
console.log('SECRET_KEY:', process.env.SECRET_KEY); // Для проверки переменной с секретным ключом

const cors = require('cors');
const mongoose = require('mongoose');


// Руты для использования в маршрутах
const indexRouter = require('./routes/indexRouter');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const editRoutes = require('./routes/editRoutes'); 
const userRoutes = require('./routes/userRoutes'); // Импортируем файл с роутами пользователей

// Загружаем переменные окружения из .env
dotenv.config();

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MakeProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Подключение к MongoDB успешно'))
    .catch((error) => console.log('Ошибка при подключении к MongoDB:', error));

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Добавьте этот параметр, если сервер и клиент на разных портах
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // Для парсинга JSON тела запросов

// Роуты
app.use('/', indexRouter); // Главный роут
app.use('/api/register', registerRoutes); // Роуты для регистрации
app.use('/api/auth', authRoutes);// Префикс для авторизации
app.use('/api/user', editRoutes); // Роуты для редактирования профиля (путь /api/user/profile)
app.use('/api/users', userRoutes); // Подключаем маршруты для пользователей

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

