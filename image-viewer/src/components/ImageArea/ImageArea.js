import React, { useContext, useRef, useEffect, useState } from 'react';
import { ImageContext } from '../../contexts/ImageContext';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';
import { ChosenTargetBoxContext } from '../../contexts/ChosenTargetBoxContext';
import TargetBox from '../TargetBox/TargetBox';
import './ImageArea.css';
import CircleROI from '../../components/ROI/CircleROI';
import TriangleROI from '../../components/ROI/TriangleROI';
import RectangleROI from '../../components/ROI/RectangleROI';
import ROI from '../ROI/ROI';

const ImageArea = ({ src, alt, initialScale = 1.0, minScale = 1 }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const { width: imageWidth, height: imageHeight } = useContext(ImageContext);
  const { targetBoxes, updateSelectedBox, updateTargetBoxes } = useContext(TargetBoxContext);
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

  const [mode, setMode] = useState(false);
  var newTargetBoxX = 0;
  var newTargetBoxY = 0;



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

      if (imgWidth <= 360 && imgHeight <= 360)
      {
        size = 'Çok Küçük';
        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      } else if (imgHeight <= 480)
      {
        size = 'Küçük';
        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      } else if (imgHeight <= 720)
      {
        size = 'Orta';
        imgWidth = (imgWidth * 6) / 8;
        imgHeight = (imgHeight * 6) / 8;

        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      } else if (imgHeight <= 1080)
      {
        imgWidth = (imgWidth * 6) / 7;
        imgHeight = (imgHeight * 6) / 7;
        size = 'Büyük';
        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      } else
      {
        imgWidth = (imgWidth * 1) / 10;
        imgHeight = (imgHeight * 1) / 10;
        size = 'Çok Büyük';
        containerWidth = `${imgWidth}px`;
        containerHeight = `${imgHeight}px`;
      }

      setImageSize(size);
      setContainerStyle({ width: containerWidth, height: containerHeight });

      if (imageRef.current)
      {
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

    if (file)
    {
      reader.readAsDataURL(file);
    }
  };

  const handleBoxClick = (e, id) => {
    updateSelectedBox(id);
    selectBox(id);
  };

  const handleWheel = (event) => {
    const { clientX, clientY, deltaY } = event;
    const zoomAmount = deltaY / 500;
    const newScale = Math.max(minScale, scale - zoomAmount);

    const imageElement = imageRef.current;
    const imageRect = imageElement.getBoundingClientRect();
    const zoomX = ((clientX - imageRect.left) / imageRect.width) * 100;
    const zoomY = ((clientY - imageRect.top) / imageRect.height) * 100;

    setScale(newScale);
    setOrigin({ x: `${zoomX}%`, y: `${zoomY}%` });
    console.log("Ben wheel");
    console.log(`${zoomX}%`, `${zoomY}%`);


  };

  const handleMouseDownImage = (event) => {
    if (event.button === 0)
    {
      event.stopPropagation(); // Event propagation'ı durdur
      setIsMouseDown(true);
      setStartMousePosition({ x: event.clientX, y: event.clientY });
    }
    console.log("Ben Down");
  };

  const handleMouseUpImage = (event) => {
    if (event.button === 0)
    {
      event.stopPropagation(); // Event propagation'ı durdur
      setIsMouseDown(false);
    }
    console.log("Ben up");

  };

  const handleMouseMoveImage = (event) => {

    if (isMouseDown)
    {

      event.stopPropagation(); // Event propagation'ı durdur
      const deltaX = event.clientX - startMousePosition.x;
      const deltaY = event.clientY - startMousePosition.y;

      const imageElement = imageRef.current;
      const containerRect = imageElement.parentElement.getBoundingClientRect();
      const imageWidth = imageElement.naturalWidth * scale;
      const imageHeight = imageElement.naturalHeight * scale;

      // Calculate the minimum and maximum allowable positions
      const minOffsetX = Math.min(0, containerRect.width - imageWidth);
      const minOffsetY = Math.min(0, containerRect.height - imageHeight);
      const maxOffsetX = 0;
      const maxOffsetY = 0;

      // Calculate the new position and constrain it within the allowable limits
      const newX = Math.max(minOffsetX, Math.min(maxOffsetX, imagePosition.x + deltaX));
      const newY = Math.max(minOffsetY, Math.min(maxOffsetY, imagePosition.y + deltaY));

      setImagePosition({ x: newX, y: newY });

      setStartMousePosition({ x: event.clientX, y: event.clientY });

    }

    const rect = event.target.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    setCoords({ x, y });
  };


  const handleMouseLeaveImage = (event) => {
    if (isMouseDown)
    {
      setIsMouseDown(false);
    }
  };

  const handleDoubleClickImage = () => {
    setScale(initialScale);
    setOrigin({ x: '50%', y: '50%' });
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseClick = (event) => {
    console.log("Clicked to image");
    const rect = event.target.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    newTargetBoxX = x;
    newTargetBoxY = y;
    console.log("New Target Box Coord : X: " + newTargetBoxX + "  Y: " + newTargetBoxY);
    setMode(true);


    localStorage.setItem('newTargetBoxX', JSON.stringify(newTargetBoxX)); // Not: react-localstorage yerine doğrudan localStorage kullanın
    localStorage.setItem('newTargetBoxY', JSON.stringify(newTargetBoxY)); // Not: react-localstorage yerine doğrudan localStorage kullanın
    targetBoxes.forEach(element => {
      console.log(element);
    });
  };

  const HandleCleanROIs = () => {
    localStorage.setItem('targetBoxes', JSON.stringify([]));
  }


  return (
    <div className="image-area" >
      <input type="file" onChange={handleImageUpload} />
      {imageSrc && (
        <div

          onWheel={handleWheel}
          onMouseDown={handleMouseDownImage}
          onMouseUp={handleMouseUpImage}
          onMouseMove={handleMouseMoveImage}
          onMouseLeave={handleMouseLeaveImage}
          onDoubleClick={handleDoubleClickImage}
          onClick={handleMouseClick}
          ref={containerRef}
          style={{
            ...containerStyle,
            border: '0px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            cursor: isMouseDown ? 'grabbing' : 'grab'
          }}

        >
          <img
            src={imageSrc}
            alt="Uploaded"
            ref={imageRef}
            draggable="false"
            style={{
              width: '100%',
              height: '100%',
              transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${scale})`,
              transformOrigin: `${origin.x} ${origin.y}`,
              transition: isMouseDown ? 'none' : 'transform 0.1s'
            }}
          />
          
          {targetBoxes.map((box) => (
            <RectangleROI
              key={box.id}
              id={box.id}
              x={box.x}
              y={box.y}
              width={box.width}
              height={box.height}
              onClick={(e) => handleBoxClick(e, box.id)}
            />
          ))}
        </div>
      )}
      <div>
        {/* <h3>Image Size: {imageSize}</h3> */}
        <button onClick={HandleCleanROIs}>
          Clean
        </button>
        coordinates: {`(${coords.x}, ${coords.y}) Adding Mode : ${mode}`}
      </div>
    </div>
  );
};


export default ImageArea;