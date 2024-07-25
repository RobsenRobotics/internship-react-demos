import React, { useState, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import "./ImageArea.css";

const ImageArea = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const resizeImage = (file, width, height) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height - 120;
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file, 850, 650);
        setImageSrc(resizedImage);
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  const handleMouseMove = (event) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;
      setCoordinates({ x, y });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <div
        className="image-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        <TransformWrapper
          initialScale={1}
          wheel={{ step: 100.0 }}
          pan={{ velocity: true }}
          maxScale={200}
        >
          {({ resetTransform }) => (
            <>
              <TransformComponent>
                <div
                  className='container'
                  onDoubleClick={() => resetTransform()}
                >
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt="Resized"
                      onDoubleClick={resetTransform}
                    />
                  )}
                </div>
              </TransformComponent>
              <div className="coordinates-display">
                X: {coordinates.x.toFixed(2)}, Y: {coordinates.y.toFixed(2)}
              </div>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default ImageArea;