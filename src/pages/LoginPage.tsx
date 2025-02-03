import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Проверяем наличие токена при загрузке страницы
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/'); // Перенаправляем на главную, если пользователь уже авторизован
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/authorization/token_service', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token); // Сохраняем токен
      navigate('/'); // Перенаправляем на главную страницу
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError('Неверное имя пользователя или пароль');
      } else {
        setError('Произошла ошибка. Попробуйте снова.');
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Авторизация</h1>
        <label htmlFor="username">Имя пользователя</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;