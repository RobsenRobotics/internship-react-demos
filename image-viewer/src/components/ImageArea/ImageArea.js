import React, { useContext } from 'react';
import { ImageContext } from '../../contexts/ImageContext';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';
import { ChosenTargetBoxContext } from '../../contexts/ChosenTargetBoxContext'
import TargetBox from '../TargetBox/TargetBox';
import './ImageArea.css';

const ImageArea = ({ src, alt }) => {
  const { width, height } = useContext(ImageContext);
  const { targetBoxes, updateSelectedBox } = useContext(TargetBoxContext);
  const { selectBox } = useContext(ChosenTargetBoxContext);

  console.log('Width in ImageArea:', width);
  console.log('Height in ImageArea:', height);

  const handleBoxClick = (id) => {
    updateSelectedBox(id);
    selectBox(id);
  };

  return (
    <div className="image-area" style={{ width: width, height: height }}>
      <img src={src} alt={alt} className="image-area-img" style={{ width: '100%', height: '100%' }} />
      {targetBoxes.map((box) => (
        <TargetBox
          key={box.id}
          id={box.id}
          x={(box.x / width) * 100}
          y={(box.y / height) * 100}
          width={box.width}
          height={box.height}
          onClick={() => handleBoxClick(box.id)}
        />
      ))}
    </div>
  );
};

export default ImageArea;
