import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Импортируем маршруты
import Header from './components/Header';  // Импортируем Header
import Home from './pages/Home';      // Импортируем Home
import About from './pages/About';    // Импортируем About
import Login from './pages/Login';    // Импортируем Login
import Register from './pages/Register';  // Импортируем Register
import Users from './pages/Users';    // Импортируем Users
import Profile from './pages/Profile';
import './styles/App.css';  // Глобальные стили

const App = () => {
  return (
    <Router>  {/* Включаем маршруты */}
      <Header />  {/* Шапка на всех страницах */}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Главная страница */}
          <Route path="/about" element={<About />} />  {/* Страница о нас */}
          <Route path="/login" element={<Login />} />  {/* Страница входа */}
          <Route path="/register" element={<Register />} />  {/* Страница регистрации */}
          <Route path="/users" element={<Users />} />  {/* Страница пользователей */}
          <Route path="/profile" element={<Profile />} />  {/* Страница пользователей */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;