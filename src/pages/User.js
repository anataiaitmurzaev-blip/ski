import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import './User.css';
import EditForm from '../components/EditForm';
import AdminForm from '../components/AdminForm';

const API_URL = 'http://localhost:5000';

const User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          await axios.get(`${API_URL}/api/check-auth`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsLoggedIn(true);
          const response = await axios.get(`${API_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
          setUserRole(response.data.role);
        } catch (error) {
          console.log('Ошибка проверки авторизации', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const [userData, setUserData] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const handleLogin = (formData) => {
    axios
      .post(`${API_URL}/api/login`, formData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios
          .get(`${API_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUserData(response.data);
            setIsLoggedIn(true);
            setUserRole(response.data.role);
          })
          .catch((error) => {
            console.log('Ошибка получения данных пользователя', error);
          });
      })
      .catch((error) => {
        console.log('Ошибка авторизации', error);
      });
  };

  const handleUpdateUser = (updatedData) => {
    const token = localStorage.getItem('token');

    axios
      .put(`${API_URL}/api/user`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setShowEditForm(false);
      })
      .catch((error) => {
        console.log('Ошибка обновления данных пользователя', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleToggleSignupForm = () => {
    setShowSignupForm(!showSignupForm);
    setShowLoginForm(false);
  };

  const handleToggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowSignupForm(false);
  };

  const [userRole, setUserRole] = useState('');
  const [showAdminForm, setShowAdminForm] = useState(false);
  const handleToggleAdminForm = () => {
    if (userRole === 'admin') {
      setShowAdminForm(!showAdminForm);
    }
  };

  return (
    <div className="user_container">
      {isLoggedIn ? (
        <div>
          <p>Добро пожаловать, {userData.name}!</p>
          <div>
            <button onClick={() => setShowEditForm(true)}>Изменить данные</button>
          </div>
          <div>
            <button onClick={handleLogout}>Выйти</button>
          </div>
          {userRole === 'admin' && isLoggedIn && (
            <div>
              <button onClick={handleToggleAdminForm}>Административная панель</button>
            </div>
          )}

          {showEditForm && <EditForm userData={userData} onUpdateUser={handleUpdateUser} />}
          {showAdminForm && <AdminForm />}
        </div>
      ) : (
        <div>
          {!showSignupForm && (
            <div className="form-group">
              <LoginForm onLogin={handleLogin} />
              <button className="form-button" onClick={handleToggleSignupForm}>
                Зарегистрироваться
              </button>
            </div>
          )}
         {showSignupForm && (
            <div className="form-group">
              <SignupForm onToggleLoginForm={handleToggleLoginForm} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
