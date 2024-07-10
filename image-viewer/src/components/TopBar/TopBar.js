import React from 'react';
import './TopBar.css';
import AddButton from '../AddButton/AddButton';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="logo"></div>
      <AddButton />
    </div>
  );
};

export default TopBar;
