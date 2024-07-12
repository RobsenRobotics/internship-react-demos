import React, { useContext, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import './TargetBox.css';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';

const TargetBox = ({ id, x, y, width, height, onClick }) => {

  const { updateTargetBoxes } = useContext(TargetBoxContext); // TargetBoxContext'ten updateTargetBoxes'ı al

  const boxStyle = {
    left: `${x}%`,
    top: `${y}%`,
    cursor: 'pointer',
    position: 'absolute'
  };

  const handleClick = e => {
    e.preventDefault();
    onClick(id);
    console.log("id : " + id);
  };

  // !! DEBUG

  const handleResizeTargetBox = (e, direction, ref, delta, position) => {
    console.log("TARGETBOX RESIZED !!!");
    console.log("PositionX : " + position.x);
    console.log("PositionY : " + position.y);
    // resize işlemi bitince ilgili id'ye sahip targetbox'un genişlik ve yükseklik değerini güncelle
    updateTargetBoxes(id, ref.style.width, ref.style.height, position.x, position.y);
  }

  return (
    <Rnd
      default={{
        x: x,
        y: y,
        width: width,
        height: height,
      }}
      minWidth={100}
      minHeight={100}
      bounds="parent"
      resizeHandleStyles={{
        topLeft: { width: '10px', height: '10px', backgroundColor: 'blue' },
        topRight: { width: '10px', height: '10px', backgroundColor: 'blue' },
        bottomLeft: { width: '10px', height: '10px', backgroundColor: 'blue' },
        bottomRight: { width: '10px', height: '10px', backgroundColor: 'blue' },
      }}
      style={{ ...boxStyle, border: '1px solid black', padding: '10px', backgroundColor: 'white' }}
      onClick={handleClick}
      onResizeStop={handleResizeTargetBox}
    >
      <div className="box-content">
        <h3>{id}</h3>
      </div>
    </Rnd>
  );
};

export default TargetBox;