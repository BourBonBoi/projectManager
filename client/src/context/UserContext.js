import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const UserContext = createContext();

// Создаем провайдер для контекста
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setUserData = (data) => {
        setUser(data); // Сохраняем данные пользователя
    };

    const logout = () => {
        setUser(null); // Убираем данные о пользователе
        localStorage.removeItem('token'); // Удаляем токен
    };

    return (
        <UserContext.Provider value={{ user, setUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Хук для использования данных о пользователе
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
