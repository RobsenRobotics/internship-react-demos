// src/components/ImageViewerArea.js
import React, { useContext, useEffect } from 'react';
import TopBar from '../TopBar/TopBar';
import ImageArea from '../ImageArea/ImageArea';
import ChosenTargetInfoArea from '../ChosenTargetInfoArea/ChosenTargetInfoArea';
import { ImageContext } from '../../contexts/ImageContext'; // Proje yapılandırmanıza göre yolunu güncelleyin
import { TargetBoxProvider } from '../../contexts/TargetBoxContext';
import { ChosenTargetBoxProvider } from '../../contexts/ChosenTargetBoxContext';
import './ImageViewerArea.css';



const ImageViewerArea = () => {
  // ImageContext'ten width, height ve updateDimensions fonksiyonunu useContext ile al
  const { width, height, updateDimensions } = useContext(ImageContext);

  const imageUrl = 'https://i.pinimg.com/originals/bf/ae/3f/bfae3fa83ae7efd6b7b56c3df0fac9bf.jpg'; // Örnek resim URL'si
  const imageAlt = 'Placeholder Image';
  const index = 1;
  const center = '(400, 200)';
  const containerWidth = '800px';
  const containerHeight = '400px';

  // Genişlik ve yükseklik değerlerini güncellemek için useEffect kullan
  useEffect(() => {
    updateDimensions(1200, 600); // Örnek olarak genişlik: 1200px, yükseklik: 600px
  }, [updateDimensions]);

  console.log("ImageViewerArea width : " + width);
  console.log("ImageViewerArea height : " + height);

  return (
    <TargetBoxProvider>
      <ChosenTargetBoxProvider>

        <div className="image-viewer-area">
          <TopBar />
          <div className="image-viewer-content">
            <div className="viewer-section">
            {/* <ImageArea src={imageUrl} /> */}
            <ImageArea src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" />

            </div>
          </div>
          <ChosenTargetInfoArea
            className="viewer-section"
            index={index}
            center={center}
            width={containerWidth}
            height={containerHeight}
          />
        </div>
      </ChosenTargetBoxProvider>

    </TargetBoxProvider>

  );
};

export default ImageViewerArea;
