import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Подключаем стили для хедера

const Header = () => {
    const username = "username"; // Должен быть динамическим, например, через state или context

    return (
        <header>
            <div className="header-container">
                <nav className="left-nav">
                    <div>
                        <h1 className="site-title">Менеджер проектов</h1>
                        <div className="hello-user">Привет, {username}</div>
                    </div>
                    <Link to="/" className="nav-link">Главная</Link>
                    <Link to="/profile" className="nav-link">Мой профиль</Link>
                    <Link to="/users" className="nav-link">Пользователи</Link>
                    <Link to="/about" className="nav-link">О нас</Link>
                </nav>
                <div className="right-nav">
                    <Link to="/register" className="nav-link">Регистрация</Link>
                    <Link to="/login" className="nav-link">Авторизация</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;