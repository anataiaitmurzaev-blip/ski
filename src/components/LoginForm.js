import React, { useState } from 'react';
import axios from 'axios';
import './LSForm.css';

const API_URL = 'http://localhost:5000';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    number: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(`${API_URL}/api/login`, formData);
        onLogin(formData);
      } catch (error) {
        console.error('Ошибка при входе', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.number) {
      errors.number = 'Введите номер телефона';
    }

    if (!formData.password) {
      errors.password = 'Введите пароль';
    }

    return errors;
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <h1 className="form-title">Вход</h1>
      <input
        className="form-input"
        type="tel"
        name="number"
        placeholder="Номер телефона"
        value={formData.number}
        onChange={handleChange}
      />
      {errors.number && <div className="error-message" style={{ color: 'white' }}>{errors.number}</div>}
      <input
        className="form-input"
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <div className="error-message" style={{ color: 'white' }}>{errors.password}</div>}
      <button className="form-button" type="submit">
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
