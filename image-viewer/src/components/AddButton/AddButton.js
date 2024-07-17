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

    // const newTargetBoxX = LocalStorage.getItem('newTargetBoxX');
    // const newTargetBoxY = LocalStorage.getItem('newTargetBoxY');
    const newTargetBoxXJson = localStorage.getItem('newTargetBoxX');
    const newTargetBoxYJson = localStorage.getItem('newTargetBoxY');
    
    const newTargetBoxX = newTargetBoxXJson ? JSON.parse(newTargetBoxXJson) : null;
    const newTargetBoxY = newTargetBoxYJson ? JSON.parse(newTargetBoxYJson) : null;

    console.log("Add Button new target coods : x :" + newTargetBoxX + "  y: " + newTargetBoxY);

    addTargetBox(newTargetBoxX, newTargetBoxY, boxWidth, boxHeight);
  };

  return (
    <button className="add-button" onClick={handleClick}>
      Add
    </button>
  );
};

export default AddButton;
