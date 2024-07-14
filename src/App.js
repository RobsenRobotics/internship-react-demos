import React from 'react';
import ImageViewerArea from './components/ImageViewerArea/ImageViewerArea';
import Sidebar from './components/Sidebar/Sidebar';
import { ImageProvider } from './contexts/ImageContext';
import './App.css';

function App() {
  return (
    <ImageProvider>
      <div className="App">
        <Sidebar />
        <ImageViewerArea />
      </div>
    </ImageProvider>
  );
}

export default App;