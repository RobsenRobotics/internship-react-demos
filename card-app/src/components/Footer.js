import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <p>&copy; 2024 My App. All rights reserved.</p>
        <ul className="footerNav">
          <li className="footerNavItem"><a href="/" className="footerNavLink">Ana Sayfa</a></li>
          <li className="footerNavItem"><a href="/hakkimizda" className="footerNavLink">Hakkımızda</a></li>
          <li className="footerNavItem"><a href="/iletisim" className="footerNavLink">İletişim</a></li>
          <li className="footerNavItem"><a href="/ssk" className="footerNavLink">SSK</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
