import React, { useContext } from 'react';
import './AddButton.css';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';
import { ImageContext } from '../../contexts/ImageContext';

const AddButton = () => {
  const { width, height } = useContext(ImageContext);
  const { addTargetBox } = useContext(TargetBoxContext);

  const handleClick = () => {
    const x = Math.random() * (width - 50); // X koordinatı, resim alanı içinde rastgele
    const y = Math.random() * (height - 50); // Y koordinatı, resim alanı içinde rastgele
    const boxWidth = 1; // Kutu genişliği
    const boxHeight = 1; // Kutu yüksekliği

    addTargetBox(x, y, boxWidth, boxHeight);
  };

  return (
    <button className="add-button" onClick={handleClick}>
      Add
    </button>
  );
};

export default AddButton;
