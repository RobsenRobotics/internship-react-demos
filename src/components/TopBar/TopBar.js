import React from 'react';
import './TopBar.css';
import AddButton from '../AddButton/AddButton';

const TopBar = ({ changer }) => {
  return (
    <div className="top-bar">
      <div className="logo"></div>
      <AddButton />
      <button onClick={changer}>Change Image</button>
    </div>
  );
};

export default TopBar;
