import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'; // Импортируем контекст для получения данных о пользователе
import '../styles/Profile.css'; // Добавьте стили для улучшения внешнего вида

const EditProfile = () => {
    const { user } = useUser(); // Получаем текущего пользователя из контекста
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'user',
        position: '',
        avatar: null
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                role: user.role || 'user',
                position: user.position || '',
                avatar: null
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            avatar: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('role', formData.role);
        formDataToSend.append('position', formData.position);

        if (formData.avatar) {
            formDataToSend.append('avatar', formData.avatar);
        }

        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'PUT',
                body: formDataToSend
            });
            const result = await response.json();

            if (response.ok) {
                alert('Профиль обновлен успешно!');
            } else {
                alert('Ошибка: ' + result.message);
            }
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при обновлении профиля');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">Редактировать профиль</h1>
                <form onSubmit={handleSubmit}>
                    <div className="profile-item">
                        <label>Имя:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="profile-item">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="profile-item">
                        <label>Должность:</label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-item">
                        <label>Роль:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="user">Пользователь</option>
                            <option value="admin">Админ</option>
                        </select>
                    </div>
                    <div className="profile-item">
                        <label>Фото профиля:</label>
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit">Сохранить изменения</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
