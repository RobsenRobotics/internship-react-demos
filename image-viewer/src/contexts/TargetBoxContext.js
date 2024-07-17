import React, { createContext, useState, useEffect } from 'react';

export const TargetBoxContext = createContext();

export const TargetBoxProvider = ({ children }) => {
  const [targetBoxes, setTargetBoxes] = useState(() => {
    const storedBoxes = localStorage.getItem('targetBoxes');
    return storedBoxes ? JSON.parse(storedBoxes) : [];
  });
  const [nextId, setNextId] = useState(() => {
    const storedBoxes = localStorage.getItem('targetBoxes');
    return storedBoxes ? JSON.parse(storedBoxes).length + 1 : 1;
  });
  const [selectedBox, setSelectedBox] = useState(null); // Selected box ID

  const addTargetBox = (x, y, width, height) => {
    const newBox = { id: nextId, x, y, width, height };
    const updatedBoxes = [...targetBoxes, newBox];
    
    setTargetBoxes(updatedBoxes);
    localStorage.setItem('targetBoxes', JSON.stringify(updatedBoxes));
    
    setNextId(nextId + 1); // Increment ID counter
  };

  const updateSelectedBox = (id) => {
    setSelectedBox(id); // Update selected box ID
  };

  const updateTargetBoxes = (id, newCenterX, newCenterY) => {
    const updatedBoxes = targetBoxes.map((box) =>
      box.id === id ? { ...box, x: newCenterX, y: newCenterY } : box
    );
    console.log(" newcenterx : " + newCenterX + "  newcentery : " + newCenterY);

    setTargetBoxes(updatedBoxes);
    localStorage.setItem('targetBoxes', JSON.stringify(updatedBoxes));
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
