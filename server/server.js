// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');


// Руты для использования в маршрутах
const indexRouter = require('./routes/indexRouter');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');


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
app.use(cors());
app.use(express.json()); // Для парсинга JSON тела запросов

// Роуты
app.use('/', indexRouter); // Главный роут
app.use('/api/auth', authRoutes);  // Роуты для авторизации
app.use('/api/register', registerRoutes); // Роуты для регистрации

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});