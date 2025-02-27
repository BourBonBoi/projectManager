import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Импортируем хук для работы с контекстом
import '../styles/Header.css'; // Подключаем стили для хедера

const Header = () => {
    const { user } = useUser(); // Получаем данные пользователя из контекста

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
                        <Link to="/logout" className="nav-link">Выход</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
