import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(400);

  const updateDimensions = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <ImageContext.Provider value={{ width, height, updateDimensions }}>
      {children}
    </ImageContext.Provider>
  );
};