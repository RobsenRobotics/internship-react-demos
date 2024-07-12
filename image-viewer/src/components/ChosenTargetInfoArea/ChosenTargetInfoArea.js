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
    if (selectedBox)
    {
      const selectedBoxInfo = targetBoxes.find(box => box.id === selectedBox);
      setBoxInfo(selectedBoxInfo);
    } else
    {
      setBoxInfo(null);
    }
  }, [selectedBox, targetBoxes]);

  if (!boxInfo)
  {
    return null;
  }

  return (
    <div className="chosen-target-info-area">
      <div className="info-row">
        <SingleInfo label="Index" value={boxInfo.id} />
        <SingleInfo label="Center X" value={Math.floor(boxInfo.x + boxInfo.width / 2)} />
        <SingleInfo label="Center Y" value={Math.floor(boxInfo.y + boxInfo.height / 2)} />
        <SingleInfo label="Width" value={boxInfo.width} />
        <SingleInfo label="Height" value={boxInfo.height} />
      </div>
    </div>
  );
};

export default ChosenTargetInfoArea;