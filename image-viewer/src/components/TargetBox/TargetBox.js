import React from 'react';
import './TargetBox.css';

const TargetBox = ({ id, x, y, width, height, onClick }) => {
  const boxStyle = {
    left: `${x}%`,
    top: `${y}%`,
    width: width,
    height: height,
    cursor: 'pointer' // Tıklanabilir olduğunu belirtmek için cursor stilini ekledik
  };

  const handleClick = () => {
    onClick(id); // Tıklanınca id'yi onClick prop'u aracılığıyla iletiyoruz
    console.log("id : " + id);
  };

  return (
    <div id={id} className="target-box" style={boxStyle} onClick={handleClick}>
      {/* Kutunun içeriği buraya */}
      <span className="box-content">Box {id}</span>
    </div>
  );
};

export default TargetBox;
