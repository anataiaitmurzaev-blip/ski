import React from 'react';
import '../styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/help">Помощь</a>
        <a href="/contacts">Контактная информация</a>
        <a href="/partnership">Сотрудничество</a>
      </div>
      <div className="footer-social">
        <a href="https://www.facebook.com">Facebook</a>
        <a href="https://www.twitter.com">Twitter</a>
        <a href="https://www.instagram.com">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
