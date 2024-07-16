import React, { useContext, useEffect, useState } from 'react';
import TopBar from '../TopBar/TopBar';
import ImageArea from '../ImageArea/ImageArea';
import ChosenTargetInfoArea from '../ChosenTargetInfoArea/ChosenTargetInfoArea';
import { ImageContext } from '../../contexts/ImageContext';
import { TargetBoxProvider } from '../../contexts/TargetBoxContext';
import { ChosenTargetBoxProvider } from '../../contexts/ChosenTargetBoxContext';
import './ImageViewerArea.css';

const ImageViewerArea = () => {
  const { updateDimensions } = useContext(ImageContext);
  const [imageIndex, setImageIndex] = useState(0); // Başlangıçta ilk resim gösterilecek

  const images = [
    "https://images.unsplash.com/photo-1553367989-1f8a5d29ee08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1553696590-4b3f68898333?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1552573449-1c180bcfe86d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const handleChangeImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Sonraki resmi göster, dizi sınırlarını aşarsa sıfıra dön
  };

  useEffect(() => {
    updateDimensions(1200, 600); // Resim boyutlarını güncelle
  }, [updateDimensions]);

  return (
    <TargetBoxProvider>
      <ChosenTargetBoxProvider>
        <div className="image-viewer-area">
          <TopBar changer={handleChangeImage} />
          <div className="image-viewer-content">
            <div className="viewer-section">
              <ImageArea src={images[imageIndex]} />
            </div>
          </div>
          <ChosenTargetInfoArea
            className="viewer-section"
            index={1}
            center="(400, 200)"
            width="800px"
            height="400px"
          />
        </div>
      </ChosenTargetBoxProvider>
    </TargetBoxProvider>
  );
};

export default ImageViewerArea;
