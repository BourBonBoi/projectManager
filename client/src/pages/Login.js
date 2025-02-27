import React, { useState } from 'react';
import '../styles/Form.css';

const Login = () => {
    // Состояния для хранения значений полей формы
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Для хранения ошибок

    // Функция для отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Отправка данных на сервер для авторизации
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {  // Укажите ваш URL для бэкенда
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),  // Отправляем данные в формате JSON
            });

            const data = await response.json();

            if (response.ok) {
                // Успешный логин - сохраняем токен в localStorage или в состоянии приложения
                console.log('Авторизация успешна:', data);
                localStorage.setItem('token', data.token);  // Сохраняем токен
                // Здесь можно направить пользователя на другую страницу после успешного логина
            } else {
                // Если ошибка (например, неправильный пароль или email), выводим сообщение
                setError(data.message || 'Ошибка при авторизации');
            }
        } catch (error) {
            setError('Ошибка на сервере');
            console.error('Ошибка при запросе:', error);
        }
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

            {error && <p className="error-message">{error}</p>}  {/* Показываем ошибку, если есть */}

            <p className="register-link">Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        </div>
    );
};

export default Login;
