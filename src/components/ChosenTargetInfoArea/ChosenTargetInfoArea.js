import React, { useContext, useEffect, useState } from 'react';
import './ChosenTargetInfoArea.css';
import SingleInfo from '../SingleInfo/SingleInfo';
import { ChosenTargetBoxContext } from '../../contexts/ChosenTargetBoxContext';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';

const ChosenTargetInfoArea = () => {
  const { selectedBox } = useContext(ChosenTargetBoxContext);
  const { targetBoxes } = useContext(TargetBoxContext);
  const [boxInfo, setBoxInfo] = useState(null);

  useEffect(() => {
    if (selectedBox) {
      const selectedBoxInfo = targetBoxes.find(box => box.id === selectedBox);
      setBoxInfo(selectedBoxInfo);
    } else {
      setBoxInfo(null);
    }
  }, [selectedBox, targetBoxes]);

  // Default values for when boxInfo is null
  const defaultBoxInfo = {
    id: 'N/A',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  const currentBoxInfo = boxInfo || defaultBoxInfo;

  return (
    <div className="chosen-target-info-area">
      <div className="info-row">
        <SingleInfo label="Index" value={currentBoxInfo.id} />
        <SingleInfo label="Center X" value={Math.floor(currentBoxInfo.x + currentBoxInfo.width / 2)} />
        <SingleInfo label="Center Y" value={Math.floor(currentBoxInfo.y + currentBoxInfo.height / 2)} />
        <SingleInfo label="Width" value={currentBoxInfo.width} />
        <SingleInfo label="Height" value={currentBoxInfo.height} />
      </div>
    </div>
  );
};

export default ChosenTargetInfoArea;
