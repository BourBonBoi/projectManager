import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Заменяем useHistory на useNavigate
import '../styles/Form.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null); // Для хранения ошибок
    const navigate = useNavigate(); // Хук для навигации

    // Функция для отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/register', { // Укажите ваш URL для бэкенда
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Отправляем данные в формате JSON
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Регистрация успешна:', data);
                navigate('/login'); // Перенаправляем на страницу логина после успешной регистрации
            } else {
                setError(data.message || 'Ошибка при регистрации');
            }
        } catch (error) {
            setError('Ошибка на сервере');
            console.error('Ошибка при запросе:', error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Регистрация</h1>
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

                <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль:</label>
                <input
                    className="form-input"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Подтвердите пароль"
                />

                <button type="submit" className="form-button">Зарегистрироваться</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <p className="register-link">Есть аккаунт? <a href="/login">Войти</a></p>
        </div>
    );
};

export default Register;
