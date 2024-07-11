import React from 'react';
import { Rnd } from 'react-rnd';
import './TargetBox.css';

const ResizableCard = ({ id, x, y, width, height, onClick }) => {
  const boxStyle = {
    left: `${x}%`,
    top: `${y}%`,
    cursor: 'pointer',
    position: 'absolute'
  };

  const handleClick = () => {
    onClick(id);
    console.log("id : " + id);
  };

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
    >
      <div className="box-content">
        <h3>{id}</h3>
      </div>
    </Rnd>
  );
};

export default ResizableCard;