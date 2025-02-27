import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'; // Импортируем контекст пользователя
import axios from 'axios'; // Для отправки запросов на сервер
import '../styles/Profile.css'; // Подключаем стили для страницы профиля

const Profile = () => {
    const { user } = useUser(); // Получаем текущего пользователя из контекста
    const [isEditing, setIsEditing] = useState(false); // Состояние для редактирования
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        position: user?.position || '',
        role: user?.role || 'user', // Роль по умолчанию
        avatar: null, // Для аватара
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');

    // Функция для обработки изменения полей
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar') {
            setFormData((prev) => ({ ...prev, avatar: files[0] }));
            setAvatarPreview(URL.createObjectURL(files[0])); // Превью изображения
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Функция для отправки формы редактирования
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = new FormData();
        updatedData.append('username', formData.username);
        updatedData.append('email', formData.email);
        updatedData.append('position', formData.position);
        updatedData.append('role', formData.role);
        if (formData.avatar) {
            updatedData.append('avatar', formData.avatar);
        }

        try {
            const response = await axios.put('/api/user/profile', updatedData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('Профиль обновлен успешно!');
            setError('');
        } catch (error) {
            setError('Ошибка при обновлении профиля');
            setSuccessMessage('');
        }
    };

    // Ожидаем, что данные о пользователе будут загружены через useUser() или API
    if (!user) {
        return (
            <div className="profile-container">
                <h2 className="profile-title">Пожалуйста, войдите в систему, чтобы просматривать свой профиль.</h2>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">{isEditing ? 'Редактировать профиль' : 'Мой профиль'}</h1>

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <div className="profile-info">
                    {isEditing ? (
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

                            {user.role === 'admin' && (
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
                            )}

                            <div className="profile-item">
                                <label>Аватар:</label>
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={handleChange}
                                />
                                {avatarPreview && (
                                    <div className="avatar-preview">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="save-button">
                                Сохранить изменения
                            </button>
                        </form>
                    ) : (
                        <>
                            <div className="profile-item">
                                <strong>Имя:</strong>
                                <p>{user.username}</p>
                            </div>
                            <div className="profile-item">
                                <strong>Email:</strong>
                                <p>{user.email}</p>
                            </div>
                            <div className="profile-item">
                                <strong>Роль:</strong>
                                <p>{user.role || 'Не указана'}</p>
                            </div>
                            <div className="profile-item">
                                <strong>Должность:</strong>
                                <p>{user.position || 'Не указана'}</p>
                            </div>

                            {user.avatar && (
                                <div className="profile-item">
                                    <strong>Аватар:</strong>
                                    <img src={user.avatar} alt="User Avatar" className="avatar" />
                                </div>
                            )}

                            <button
                                className="edit-button"
                                onClick={() => setIsEditing(true)}
                            >
                                Редактировать
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
