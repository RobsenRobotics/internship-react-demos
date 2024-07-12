import React, { useContext } from 'react';
import { Rnd } from 'react-rnd';
import './TargetBox.css';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';

const TargetBox = ({ id, x, y, width, height, onClick }) => {
  const { updateTargetBoxes, selectedBox } = useContext(TargetBoxContext);

  const boxStyle = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    width: `${width}px`,
    height: `${height}px`,
    border: '5px solid',
    borderColor: selectedBox === id ? 'rgb(103, 201, 94)' : 'blue', // Seçili kutu yeşil, diğerleri mavi
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'move',
    boxSizing: 'border-box',
  };

  // const handleDragStop = (e, d) => {
  //   const newX = x + d.x;
  //   const newY = y + d.y;
  //   updateTargetBoxes(id, width, height, newX, newY);
  // };

  const handleResizeTargetBox = (e, direction, ref, delta, position) => {
    updateTargetBoxes(id, ref.style.width, ref.style.height, position.x, position.y);
  };

  const handleClick = e => {
    e.preventDefault();
    onClick(id);
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
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
      }}

      // onDragStop={handleDragStop}
    >
      <div className="box-content" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(255, 0, 0, 0.5)', cursor: 'move', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
    </Rnd>
  );
};

export default TargetBox;
