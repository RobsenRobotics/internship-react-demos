import React, { createContext, useState, useEffect } from 'react';

export const TargetBoxContext = createContext();

export const TargetBoxProvider = ({ children }) => {
  const [targetBoxes, setTargetBoxes] = useState([]);
  const [, setSelectedBoxId] = useState(0);

  const addTargetBox = (id, x, y, width, height) => {
    setTargetBoxes((prevBoxes) => [
      ...prevBoxes,
      { id, x, y, width, height }
    ]);
  };

  const updateSelectedBox = (id) => {
    setSelectedBoxId(id);
  };

  const updateTargetBoxes = (id, newWidth, newHeight, newCenterX, newCenterY) => {
    setTargetBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id ? { ...box, width: newWidth, height: newHeight, x: newCenterX, y: newCenterY } : box
      )
    );
  };

  useEffect(() => {
    console.log("Target Boxes: ", targetBoxes);
  }, [targetBoxes]);

  return (
    <TargetBoxContext.Provider value={{ addTargetBox, targetBoxes, updateSelectedBox, updateTargetBoxes }}>
      {children}
    </TargetBoxContext.Provider>
  );
};

