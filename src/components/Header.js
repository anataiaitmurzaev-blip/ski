import React, { useState } from 'react';
import Navigation from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSkiing } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

const Header = ({ userRole }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <FontAwesomeIcon icon={faSkiing} className="ski-icon" />
        <h1 className="logo">SKI.KG</h1>
      </div>
      <button className="menu-toggle" onClick={handleMenuToggle}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>
      <Navigation 
        isMenuOpen={isMenuOpen} 
        handleMenuToggle={handleMenuToggle} 
        userRole={userRole} 
        menuItems={["Снаряжение", "Аренда", "Склоны", "Контакты"]} 
      />
    </header>
  );
};

export default Header;