import React, { useContext, useEffect, useState } from 'react';
import './ChosenTargetInfoArea.css';
import SingleInfo from '../SingleInfo/SingleInfo';
import { ChosenTargetBoxContext } from '../../contexts/ChosenTargetBoxContext';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';

const ChosenTargetInfoArea = () => {
  const { selectedBox } = useContext(ChosenTargetBoxContext); // ChosenTargetBoxContext'ten selectedBox'u al
  const { targetBoxes } = useContext(TargetBoxContext); // TargetBoxContext'ten targetBoxes'ı al
  const [boxInfo, setBoxInfo] = useState(null); // Seçilen kutunun bilgilerini tutacak state

  // ! farklı bir taneye tıklanınca useeffect çalışıyor


  // Seçilen kutunun bilgilerini güncelle
  useEffect(() => {
    if (selectedBox) {
      const selectedBoxInfo = targetBoxes.find(box => box.id === selectedBox);
      console.log("Selected Box Info:", selectedBoxInfo);
      setBoxInfo(selectedBoxInfo);
    } else {
      setBoxInfo(null);
    }
  }, [selectedBox, targetBoxes]); // selectedBox veya targetBoxes değiştiğinde useEffect yeniden çalışır

  if (!boxInfo) {
    return null; // Eğer seçilen hedef kutusu bulunamazsa, bileşen boş döner
  }

  return (
    <div className="chosen-target-info-area">
      <div className="info-row">
        <SingleInfo label="Index" value={boxInfo.id} />
        <SingleInfo label="Center X" value={boxInfo.x + boxInfo.width / 2} />
        <SingleInfo label="Center Y" value={boxInfo.y + boxInfo.height / 2} />
        <SingleInfo label="Width" value={boxInfo.width} />
        <SingleInfo label="Height" value={boxInfo.height} />
      </div>
    </div>
  );
};

export default ChosenTargetInfoArea;
