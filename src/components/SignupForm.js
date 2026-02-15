import React, { useState } from 'react';
import axios from 'axios';
import './LSForm.css';

const API_URL = 'http://localhost:5000';

const SignupForm = ({ onToggleLoginForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    number: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`${API_URL}/api/register`, formData)
        .then((response) => {
          console.log('Регистрация прошла успешно', response.data);
          setRegistrationSuccess(true);
        })
        .catch((error) => {
          console.log('Ошибка при регистрации', error.response.data);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Введите имя';
    }

    if (!formData.last_name) {
      errors.last_name = 'Введите фамилию';
    }

    if (!formData.email) {
      errors.email = 'Введите email';
    }

    if (!formData.number) {
      errors.number = 'Введите номер телефона';
    }

    if (!formData.password) {
      errors.password = 'Введите пароль';
    }

    return errors;
  };

  const handleToggleLoginForm = () => {
    onToggleLoginForm();
  };

  return (
    <div className="form-group">
      <h1 className="form-title">Регистрация</h1>
      {registrationSuccess ? (
        <div>
          <p>Вы успешно зарегистрированы!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Имя"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-field">
            <input
              className="form-input"
              type="text"
              name="last_name"
              placeholder="Фамилия"
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <div className="error-message">{errors.last_name}</div>}
          </div>

          <div className="form-field">
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-field">
            <input
              className="form-input"
              type="tel"
              name="number"
              placeholder="Номер телефона"
              value={formData.number}
              onChange={handleChange}
            />
            {errors.number && <div className="error-message">{errors.number}</div>}
          </div>

          <div className="form-field">
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-field">
            <button className="form-button" type="submit">
              Зарегистрироваться
            </button>
          </div>
          <div className="form-field">
            <button className="form-button" type="button" onClick={handleToggleLoginForm}>
              Войти
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignupForm;

