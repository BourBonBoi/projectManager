import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const UserContext = createContext();

// Создаем провайдер для контекста
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Храним данные о пользователе

    const setUserData = (data) => {
        setUser(data); // Обновляем данные о пользователе
    };

    return (
        <UserContext.Provider value={{ user, setUserData }}>
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
