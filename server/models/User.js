const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // для хэширования паролей
const Schema = mongoose.Schema;

// Схема пользователя
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user', // Роль по умолчанию — 'user'
        enum: ['user', 'admin']
    },
    position: {
        type: String,
        required: false
    },
    avatar: {
        type: String,  // Для хранения URL изображения
        required: false
    }
});

// Хэшируем пароль перед сохранением
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Метод для проверки пароля
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
