import React, { useContext, useRef, useEffect, useState } from 'react';
import { ImageContext } from '../../contexts/ImageContext';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';
import { ChosenTargetBoxContext } from '../../contexts/ChosenTargetBoxContext';
import TargetBox from '../TargetBox/TargetBox';
import './ImageArea.css';

const ImageArea = ({ src, alt, initialScale = 1.0, minScale = 1 }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const { width: imageWidth, height: imageHeight } = useContext(ImageContext);
  const { targetBoxes, updateSelectedBox } = useContext(TargetBoxContext);
  const { selectBox } = useContext(ChosenTargetBoxContext);
  const containerRef = useRef(null);

  const [scale, setScale] = useState(initialScale);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [imageSize, setImageSize] = useState('');
  const [containerStyle, setContainerStyle] = useState({ width: 'auto', height: 'auto' });

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      let imgWidth = img.width;
      let imgHeight = img.height;

      let size = '';
      let containerWidth = '';
      let containerHeight = '';
      console.log("img.width : ", img.width);
      console.log("img.height : ", img.height);

      if (imgWidth <= 360 && imgHeight <= 360) {
        size = 'Çok Küçük';
        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      } else if (/*imgWidth <= 480 && */ imgHeight <= 480) {
        size = 'Küçük';
        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      } else if (/*imgWidth <= 720 &&*/ imgHeight <= 720) {
        size = 'Orta';
        imgWidth = (imgWidth * 6) / 8;
        imgHeight = (imgHeight * 6) / 8;

        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      } else if (/*imgWidth <= 1080 && */imgHeight <= 1080) {
        imgWidth = (imgWidth * 6) / 7;
        imgHeight = (imgHeight * 6) / 7;
        size = 'Büyük';
        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      } else {
        imgWidth = (imgWidth * 1) / 10;
        imgHeight = (imgHeight * 1) / 10;
        size = 'Çok Büyük';
        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      }

      setImageSize(size);
      setContainerStyle({ width: containerWidth, height: containerHeight });

      if (imageRef.current) {
        const naturalWidth = imageRef.current.naturalWidth;
        const naturalHeight = imageRef.current.naturalHeight;
  
        containerRef.current.style.width = `${naturalWidth}px`;
        containerRef.current.style.height = `${naturalHeight}px`;
      }
    };
  }, [imageSrc]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBoxClick = (e, id) => {
    updateSelectedBox(id);
    selectBox(id);
  };

  const handleWheel = (event) => {
    const { clientX, clientY, deltaY } = event;
    const zoomAmount = deltaY / 500; // Adjust zoom speed if necessary
    const newScale = Math.max(minScale, scale - zoomAmount);

    // Calculate zoom center relative to the image position
    const imageElement = imageRef.current;
    const imageRect = imageElement.getBoundingClientRect();
    const zoomX = ((clientX - imageRect.left) / imageRect.width) * 100;
    const zoomY = ((clientY - imageRect.top) / imageRect.height) * 100;

    setScale(newScale);
    setOrigin({ x: `${zoomX}%`, y: `${zoomY}%` });
  };

  const handleMouseDown = (event) => {
    if (event.button === 0) { // 0 is the code for the left button
      setIsMouseDown(true);
      setStartMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = (event) => {
    if (event.button === 0) { // 0 is the code for the left button
      setIsMouseDown(false);
    }
  };

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      const deltaX = event.clientX - startMousePosition.x;
      const deltaY = event.clientY - startMousePosition.y;

      const imageElement = imageRef.current;
      const containerRect = imageElement.parentElement.getBoundingClientRect();
      const imageWidth = imageElement.naturalWidth * scale;
      const imageHeight = imageElement.naturalHeight * scale;

      // Calculate the maximum allowable panning offsets
      const maxOffsetX = Math.max((imageWidth - containerRect.width) / 2, 0);
      const maxOffsetY = Math.max((imageHeight - containerRect.height) / 2, 0);

      // Constrain the image position within the allowable limits
      const newX = Math.max(-maxOffsetX, Math.min(maxOffsetX, imagePosition.x + deltaX));
      const newY = Math.max(-maxOffsetY, Math.min(maxOffsetY, imagePosition.y + deltaY));

      setImagePosition({ x: newX, y: newY });

      setStartMousePosition({ x: event.clientX, y: event.clientY });
    }

    const rect = event.target.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    setCoords({ x, y });
  };

  const handleMouseLeave = (event) => {
    if (isMouseDown) {
      setIsMouseDown(false);
    }
  };

  const handleDoubleClick = () => {
    setScale(initialScale);
    setOrigin({ x: '50%', y: '50%' });
    setImagePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="image-area"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isMouseDown ? 'grabbing' : 'grab' }}
      ref={containerRef}
      onDoubleClick={handleDoubleClick}
    >
      <input type="file" onChange={handleImageUpload} />
      {imageSrc && (
        <div style={{
          ...containerStyle,
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <img src={imageSrc} alt="Uploaded" ref={imageRef} style={{
            width: '100%',
            height: '100%',
            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${scale})`,
            transformOrigin: `${origin.x} ${origin.y}`,
            transition: isMouseDown ? 'none' : 'transform 0.1s'
          }} />
        </div>
      )}
      {imageSize && <p>Resim Boyutu: {imageSize}</p>}

      {targetBoxes.map((box) => (
        <TargetBox
          key={box.id}
          id={box.id}
          x={(box.x / imageWidth) * 100}
          y={(box.y / imageHeight) * 100}
          width={box.width}
          height={box.height}
          onClick={(e) => handleBoxClick(e, box.id)}
        />
      ))}
      <div className="coordinates-display">
        {`X: ${coords.x}, Y: ${coords.y}`}
      </div>
    </div>
  );
};

export default ImageArea;
