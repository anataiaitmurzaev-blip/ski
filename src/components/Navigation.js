import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

const Navigation = ({ isMenuOpen, handleMenuToggle }) => {
  return (
    <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={handleMenuToggle}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Главная</Link>
        </li>
        <li>
          <Link to="/equipment" className="nav-link">Снаряжение</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">О нас</Link>
        </li>
        <li>
          <Link to="/locations" className="nav-link">Локации</Link>
        </li>
        <li>
          <Link to="/rentalinfo" className="nav-link">Как арендовать</Link>
        </li>
        <li>
          <Link to="/user" className="nav-link">Кабинет</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
