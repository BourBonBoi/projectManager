import React, { useState } from 'react';
import '../styles/Form.css';

const Login = () => {
    // Состояния для хранения значений полей формы
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Функция для отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        // Здесь можно отправить данные на сервер для авторизации
        console.log('Авторизация:', { email, password });
    };

    return  (
        <div className="form-container">
            <h1 className="form-title">Авторизация</h1>
            <form className="register-form" onSubmit={handleSubmit}>
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
                
                <button type="submit" className="form-button">Войти</button>
            </form>
            <p className="register-link">Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        </div>
    );
};

export default Login;