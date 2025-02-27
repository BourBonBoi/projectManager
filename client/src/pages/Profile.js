import React from 'react';
import { useUser } from '../context/UserContext'; // Импортируем контекст пользователя

const Profile = () => {
    const { user } = useUser();

    if (!user) {
        return <p>Пожалуйста, войдите в систему, чтобы просматривать свой профиль.</p>;
    }

    return (
        <div>
            <h1>Мой профиль</h1>
            <p>Имя: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Profile;
