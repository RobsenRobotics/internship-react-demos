import React, { useContext, useEffect } from 'react';
import TopBar from '../TopBar/TopBar';
import ImageArea from '../ImageArea/ImageArea';
import ChosenTargetInfoArea from '../ChosenTargetInfoArea/ChosenTargetInfoArea';
import { ImageContext } from '../../contexts/ImageContext';
import { TargetBoxProvider } from '../../contexts/TargetBoxContext';
import { ChosenTargetBoxProvider } from '../../contexts/ChosenTargetBoxContext';
import './ImageViewerArea.css';

const ImageViewerArea = () => {
  const { updateDimensions } = useContext(ImageContext);

  const index = 1;
  const center = '(400, 200)';
  const containerWidth = '800px';
  const containerHeight = '400px';

  useEffect(() => {
    updateDimensions(1200, 600);
  }, [updateDimensions]);

  return (
    <TargetBoxProvider>
      <ChosenTargetBoxProvider>
        <div className="image-viewer-area">
          <TopBar />
          <div className="image-viewer-content">
            <div className="viewer-section">
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