import React, { useState, useRef } from 'react';
import './RotatingRectangle.css';

const RotatingRectangle = () => {
  const [angle, setAngle] = useState(0);
  const rectangleRef = useRef(null);
  const initialPosition = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    initialPosition.current = {
      x: e.clientX,
      y: e.clientY
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const deltaX = e.clientX - initialPosition.current.x;
    const deltaY = e.clientY - initialPosition.current.y;
    const radians = Math.atan2(deltaY, deltaX);
    const degrees = radians * (180 / Math.PI);
    setAngle(degrees);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className="rectangle" 
      ref={rectangleRef} 
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <button 
        className="rotate-button" 
        onMouseDown={handleMouseDown}
      >
        Rotate
      </button>
    </div>
  );
};

export default RotatingRectangle;
