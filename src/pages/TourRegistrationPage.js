import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './TourRegistrationPage.css';

const API_URL = 'http://localhost:5000';

const TourRegistrationPage = ({ match }) => {
  const tourId = match.params.tourId;
  const [user, setUser] = useState(null);
  const [tourData, setTourData] = useState(null);
  const [participantData, setParticipantData] = useState({
    date: '',
    name: '',
    lastname: '',
    number: '',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    checkAuth();
    getTourInfoFromDatabase();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token !== null) {
        const response = await axios.get(`${API_URL}/api/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации', error);
    }
  };

  const getTourInfoFromDatabase = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/my_tour/${tourId}`);
      setTourData(response.data);
    } catch (error) {
      console.error('Ошибка получения данных тура', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setParticipantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      if (user) {
        try {
          await axios.post(`${API_URL}/api/participants`, participantData);
          // Дополнительные действия после успешной отправки формы
        } catch (error) {
          console.error('Ошибка отправки формы', error);
        }
      } else {
        console.log('Пользователь не авторизован');
        // Обработка случая, когда пользователь не авторизован
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!participantData.date) {
      errors.date = 'Введите дату тура';
    }

    if (!participantData.name) {
      errors.name = 'Введите имя';
    }

    if (!participantData.lastname) {
      errors.lastname = 'Введите фамилию';
    }

    if (!participantData.number) {
      errors.number = 'Введите номер телефона';
    }

    if (!participantData.paymentMethod) {
      errors.paymentMethod = 'Выберите способ оплаты';
    }

    return errors;
  };

  const handleLoginClick = () => {
    history.push('/user'); // Переход на страницу авторизации пользователя
  };

  return (
    <div className="tour-registration-page">
      {user ? (
        <>
          {tourData && <h2>Форма записи на тур: {tourData.title}</h2>}
          <form onSubmit={handleSubmit} className="tour-registration-form">
            <div className="form-group">
              <label>Дата:</label>
              <input
                type="date"
                name="date"
                value={participantData.date}
                onChange={handleInputChange}
              />
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>
            <div className="form-group">
              <label>Имя:</label>
              <input
                type="text"
                name="name"
                value={participantData.name}
                onChange={handleInputChange}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Фамилия:</label>
              <input
                type="text"
                name="lastname"
                value={participantData.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && <div className="error-message">{errors.lastname}</div>}
            </div>
            <div className="form-group">
              <label>Номер телефона:</label>
              <input
                type="text"
                name="number"
                value={participantData.number}
                onChange={handleInputChange}
              />
              {errors.number && <div className="error-message">{errors.number}</div>}
            </div>
            <div className="form-group">
              <label>Способ оплаты:</label>
              <select
                name="paymentMethod"
                value={participantData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="">Выберите способ оплаты</option>
                <option value="карта">Оплата по картам</option>
                <option value="телефон">Оплата на баланс телефона</option>
              </select>
              {errors.paymentMethod && (
                <div className="error-message">{errors.paymentMethod}</div>
              )}
            </div>
            <button type="submit" className="button-anim">
              Записаться
            </button>
          </form>
        </>
      ) : (
        <div>
          <p>Чтобы зарегистрироваться на тур, пожалуйста, авторизуйтесь.</p>
          <button onClick={handleLoginClick} className="button-anim">
            Авторизоваться
          </button>
        </div>
      )}
    </div>
  );
};

export default TourRegistrationPage;
