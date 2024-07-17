import React, { useContext } from 'react';
import { Rnd } from 'react-rnd';
import './TargetBox.css';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';

const TargetBox = ({ id, x, y, width, height, onClick }) => {
  const { selectedBox } = useContext(TargetBoxContext);

  const boxStyle = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    width: `${width}px`,
    height: `${height}px`,
    border: '5px dashed blue',
    borderColor: selectedBox === id ? 'rgb(103, 201, 94)' : 'blue',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'move',
    boxSizing: 'border-box',
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("TargetBox Clicked");
    console.log("X");
    onClick(id);
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
      dragHandleClassName="box-content"
      style={boxStyle}
      onClick={handleClick}
      resizeHandleStyles={{
        topLeft: { width: '10px', height: '10px', backgroundColor: 'blue' },
        topRight: { width: '10px', height: '10px', backgroundColor: 'blue' },
        bottomLeft: { width: '10px', height: '10px', backgroundColor: 'blue' },
        bottomRight: { width: '10px', height: '10px', backgroundColor: 'blue' },
        left: { display: 'none' },
        right: { display: 'none' },
        top: { display: 'none' },
        bottom: { display: 'none' },
      }}
    >
      <div
        className="box-content"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          cursor: 'move',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
    </Rnd>
  );
};

export default TargetBox;
