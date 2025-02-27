import React, { useEffect, useState } from 'react';
import '../styles/Users.css'; // Подключаем файл с стилями

const Users = () => {
    const [users, setUsers] = useState([]); // Состояние для хранения списка пользователей
    const [error, setError] = useState(null); // Состояние для обработки ошибок

    // Функция для получения пользователей из базы данных
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/all');
            if (!response.ok) {
                throw new Error('Ошибка при получении пользователей');
            }
            const data = await response.json();
            setUsers(data); // Сохраняем пользователей в состояние
        } catch (error) {
            setError(error.message); // Если ошибка, записываем в состояние
        }
    };

    useEffect(() => {
        fetchUsers(); // При монтировании компонента запрашиваем пользователей
    }, []);

    return (
        <div className="users-container">
            <h1 className="users-title">Страница пользователей</h1>
            {error && <p className="error-message">{error}</p>}
            <p className="info-message">Здесь будет список пользователей.</p>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Должность</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.position}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Нет пользователей</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
