import React, { useContext, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import './ROI.css';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';

const ROI = ({ id, x, y, width, height, shape, onClick }) => {
  const { selectedBox, updateSelectedBox, updateTargetBoxes } = useContext(TargetBoxContext);
  const [position, setPosition] = useState({ x, y });
  const [isDashed, setIsDashed] = useState(true); // Başlangıçta dashed olarak başlayacak

  useEffect(() => {
    console.log("Updated Position X:", position.x, "Y:", position.y);
  }, [position]);

  const getShapeStyle = () => {
    switch (shape) {
      case 'circle':
        return {
          borderRadius: '50%',
        };
      case 'triangle':
        return {
          width: 0,
          height: 0,
          borderLeft: `${width / 2}px solid transparent`,
          borderRight: `${width / 2}px solid transparent`,
          borderBottom: `${height}px solid rgba(255, 255, 255, 0.5)`,
          backgroundColor: 'transparent',
        };
      default:
        return {};
    }
  };

  const boxStyle = {
    position: 'absolute',
    width: `${width}px`,
    height: shape === 'triangle' ? 0 : `${height}px`,
    border: isDashed ? '5px dashed rgb(103, 201, 94)' : '5px solid rgb(103, 201, 94)', // Toggle edilen border
    borderColor: selectedBox === id ? 'rgb(103, 201, 94)' : 'blue',
    backgroundColor: shape === 'triangle' ? 'transparent' : 'rgba(255, 255, 255, 0.5)',
    cursor: 'move',
    boxSizing: 'border-box',
    ...getShapeStyle(),
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("ROI Clicked");
    console.log("Clicked X:", position.x);
    onClick(id);
  };

  const handleDragStop = (e, data) => {
    
    setPosition({ x: data.x, y: data.y });
    updateTargetBoxes(id, data.x, data.y, width, height); // Drag işlemi sonrası güncelleme
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    const { width, height, x, y } = position;
    updateTargetBoxes(id, x, y); // Resize işlemi sonrası güncelleme
  };

  const handleToggleBorder = () =>  {
    setIsDashed(prev => !prev); // Dashed ve solid arasında toggle yap
  };

  const handleUpdatePosition = (position) => {
    console.log(position);
  }

  return (
    <Rnd
      position={{ x: position.x, y: position.y }}
      size={{ width, height }}
      minWidth={100}
      minHeight={100}
      bounds="parent"
      dragHandleClassName="box-content"
      style={boxStyle}
      onClick={handleClick}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      updatePosition = {handleUpdatePosition}
    
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
          width: shape === 'triangle' ? 0 : '20px',
          height: shape === 'triangle' ? 0 : '20px',
          borderRadius: '50%',
          backgroundColor: shape === 'triangle' ? 'transparent' : 'rgba(255, 0, 0, 0.5)',
          cursor: 'move',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      <button
        onClick={handleToggleBorder}
        style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          padding: '7px 7px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
      </button>
    </Rnd>
  );
};

export default ROI;
