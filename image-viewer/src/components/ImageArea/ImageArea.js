import React, { useContext, useRef, useEffect, useState } from 'react';
import { ImageContext } from '../../contexts/ImageContext';
import { TargetBoxContext } from '../../contexts/TargetBoxContext';
import { ChosenTargetBoxContext } from '../../contexts/ChosenTargetBoxContext';
import TargetBox from '../TargetBox/TargetBox';
import './ImageArea.css';

const ImageArea = ({ src, alt, initialScale = 1.0, minScale = 1 }) => {

  //
  const { width: imageWidth, height: imageHeight } = useContext(ImageContext);
  const { targetBoxes, updateSelectedBox } = useContext(TargetBoxContext);
  const { selectBox } = useContext(ChosenTargetBoxContext);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(imageWidth / 2);
  const [containerHeight, setContainerHeight] = useState(imageHeight / 2);
  //

  const [scale, setScale] = useState(initialScale);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  //
  const handleBoxClick = (e, id) => {
    // e.stopPropagation(); // Prevent default behavior
    updateSelectedBox(id);
    selectBox(id);
  };
  

  useEffect(() => {
    if (containerRef.current) {
      const minWidth = imageWidth / 2;
      const minHeight = imageHeight / 2;
      setContainerWidth(Math.max(minWidth, Math.min(imageWidth * 4, containerRef.current.clientWidth)));
      setContainerHeight(Math.max(minHeight, Math.min(imageHeight * 4, containerRef.current.clientHeight)));
    }
  }, [imageWidth, imageHeight]);
  //
  

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
      console.log({ x: event.clientX, y: event.clientY, leftClicked: true });
    }
  };

  const handleMouseUp = (event) => {
    if (event.button === 0) { // 0 is the code for the left button
      setIsMouseDown(false);
      console.log({ x: event.clientX, y: event.clientY, leftClicked: false });
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

      console.log({ x: event.clientX, y: event.clientY, leftClicked: true });
    }
  };

  const handleMouseLeave = (event) => {
    if (isMouseDown) {
      setIsMouseDown(false);
      console.log({ x: event.clientX, y: event.clientY, leftClicked: false });
    }
  };

  return (
    <div
      className="image-area"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave} // Ensure panning stops if the mouse leaves the image area
      style={{ overflow: 'hidden', width: '1000px', height: '720px', position: 'relative', cursor: isMouseDown ? 'grabbing' : 'grab' }}
      ref={containerRef}
   >
      <img
  ref={imageRef}
  id="image-area"
  src={src}
  alt={alt}
  style={{
    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${scale})`,
    transformOrigin: `${origin.x} ${origin.y}`,
    transition: isMouseDown ? 'none' : 'transform 0.1s',
    userSelect: 'none', // Prevent text selection
    maxWidth: '100%', maxHeight: '100%',
    pointerEvents: 'none' // Prevent dragging
  }}
/>

      {targetBoxes.map((box) => (
        <TargetBox
        key={box.id}
        id={box.id}
        x={(box.x / imageWidth) * 100}
        y={(box.y / imageHeight) * 100}
        width={box.width}
        height={box.height}
        onClick={(e) => handleBoxClick(e, box.id) }
      />
      
      ))}
    </div>
  );
};

export default ImageArea;