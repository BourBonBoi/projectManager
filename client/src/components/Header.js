import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate для редиректа
import { useUser } from '../context/UserContext'; // Хук для доступа к контексту пользователя
import '../styles/Header.css'; // Подключаем стили для хедера

const Header = () => {
    const { user, logout } = useUser(); // Получаем данные пользователя и функцию logout из контекста
    const navigate = useNavigate(); // Хук для редиректа

    // Функция для выхода из системы
    const handleLogout = () => {
        logout(); // Вызываем logout для очистки данных
        navigate('/login'); // Перенаправляем пользователя на страницу входа
    };

    return (
        <header>
            <div className="header-container">
                <nav className="left-nav">
                    <div>
                        <h1 className="site-title">Менеджер проектов</h1>
                        <div className="hello-user">
                            {user ? `Привет, ${user.username}` : 'Привет, Гость'}
                        </div>
                    </div>
                    <Link to="/" className="nav-link">Главная</Link>
                    <Link to="/profile" className="nav-link">Мой профиль</Link>
                    <Link to="/users" className="nav-link">Пользователи</Link>
                    <Link to="/about" className="nav-link">О нас</Link>
                </nav>
                <div className="right-nav">
                    {!user ? (
                        <>
                            <Link to="/register" className="nav-link">Регистрация</Link>
                            <Link to="/login" className="nav-link">Авторизация</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="nav-link">
                            Выход
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
