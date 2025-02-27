import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Замените useHistory на useNavigate
import { useUser } from '../context/UserContext'; // Хук для работы с контекстом
import '../styles/Form.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Для хранения ошибок
    const { setUserData } = useUser(); // Получаем функцию для обновления данных о пользователе
    const navigate = useNavigate(); // Используем useNavigate вместо useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {  // Ваш endpoint для авторизации
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Успешный логин - сохраняем токен в localStorage и обновляем контекст
                localStorage.setItem('token', data.token); // Сохраняем токен
                setUserData(data.user);  // Обновляем состояние в контексте данными о пользователе
                navigate('/');  // Перенаправляем на главную страницу
            } else {
                // Ошибка авторизации
                setError(data.message || 'Ошибка при авторизации');
            }
        } catch (error) {
            setError('Ошибка на сервере');
            console.error('Ошибка при запросе:', error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Авторизация</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="email">Email:</label>
                <input
                    className="form-input"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Введите ваш email"
                />

                <label className="form-label" htmlFor="password">Пароль:</label>
                <input
                    className="form-input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Введите пароль"
                />

                <button type="submit" className="form-button">Войти</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <p className="register-link">Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        </div>
    );
};

export default Login;
