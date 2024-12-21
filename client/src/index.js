import React from 'react';
import ReactDOM from 'react-dom/client';  // Используйте ReactDOM из react-dom/client
import './styles/Base.css';  // Ваши глобальные стили
import App from './App';  // Импортируем главный компонент App

// Рендерим приложение в элемент с id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);