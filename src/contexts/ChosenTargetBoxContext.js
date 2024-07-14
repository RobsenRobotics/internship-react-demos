import React, { createContext, useState } from 'react';

export const ChosenTargetBoxContext = createContext();

export const ChosenTargetBoxProvider = ({ children }) => {
  const [selectedBox, setSelectedBox] = useState(null);

  const selectBox = (box) => {
    setSelectedBox(box);
  };

  const deselectBox = () => {
    setSelectedBox(null);
  };

  return (
    <ChosenTargetBoxContext.Provider value={{ selectedBox, selectBox, deselectBox }}>
      {children}
    </ChosenTargetBoxContext.Provider>
  );
};
