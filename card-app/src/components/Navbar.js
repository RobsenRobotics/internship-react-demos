import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <ul className="navList">
        <li className="navItem"><a href="/" className="navLink">Ana Sayfa</a></li>
        <li className="navItem"><a href="/hakkimizda" className="navLink">Hakkımızda</a></li>
        <li className="navItem"><a href="/iletisim" className="navLink">İletişim</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
