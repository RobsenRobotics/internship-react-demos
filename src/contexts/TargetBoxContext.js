import React, { createContext, useState, useEffect } from 'react';

export const TargetBoxContext = createContext();

export const TargetBoxProvider = ({ children }) => {
  const [targetBoxes, setTargetBoxes] = useState([]);
  const [nextId, setNextId] = useState(1); // Initial ID counter
  const [selectedBox, setSelectedBox] = useState(null); // Selected box ID

  const addTargetBox = (x, y, width, height) => {
    setTargetBoxes((prevBoxes) => [
      ...prevBoxes,
      { id: nextId, x, y, width, height }
    ]);
    setNextId(nextId + 1); // Increment ID counter
  };

  const updateSelectedBox = (id) => {
    setSelectedBox(id); // Update selected box ID
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
    <TargetBoxContext.Provider value={{ addTargetBox, updateSelectedBox, selectedBox, targetBoxes, updateTargetBoxes }}>
      {children}
    </TargetBoxContext.Provider>
  );
};
