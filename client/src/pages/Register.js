import React, { useState } from 'react';
import '../styles/Form.css'; // Подключаем стили для хедера

const Register = () => {
    // Состояния для хранения значений полей формы
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Функция для отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Можно добавить валидацию
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        // Здесь можно отправить данные на сервер
        console.log('Регистрация:', { username, email, password });
    };

    return (
        <div className="register-form">
            <h1 className="form-title">Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="username">Имя:</label>
                <input className="form-input"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Введите ваше имя"
                />
                
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Введите ваш email"
                />
                
                <label className="form-label" htmlFor="password">Пароль:</label>
                <input className="form-input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Введите пароль"
                />
                
                <label className="form-label" htmlFor="confirm-password">Подтвердите пароль:</label>
                <input className="form-input"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Повторите пароль"
                />
                
                <button className="form-button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="login-link">Уже есть аккаунт? <a href="/login">Войти</a></p>
        </div>
    );
};

export default Register;