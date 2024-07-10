// src/contexts/ImageContext.js

import React, { createContext, useState } from 'react';

export const ImageContext = createContext();




export const ImageProvider = ({ children }) => {
  const [width, setWidth] = useState(800); // Örnek olarak 800px genişlik
  const [height, setHeight] = useState(400); // Örnek olarak 400px yükseklik

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
