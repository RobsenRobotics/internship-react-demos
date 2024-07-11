import React, { useState, useRef } from 'react';

const ImageArea = ({ src, alt, initialScale = 1.0, minScale = 1 }) => {
  const [scale, setScale] = useState(initialScale);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

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
          pointerEvents: 'none', // Prevent dragging
        }}
        onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu on the image
        onDragStart={(e) => e.preventDefault()} // Prevent dragging the image
      />
    </div>
  );
};

export default ImageArea;


// import React, { useState } from 'react';

// const ImageArea = ({ src }) => {
//   const initialZoom = 1;

//   const [zoom, setZoom] = useState(initialZoom);

//   const handleWheel = (event) => {
//     const delta = event.deltaY / 100; // Tekerlek kaydırma miktarını al
//     const newZoom = Math.max(0.1, Math.min(3, zoom + delta)); // Zoom sınırlarını kontrol et
//     setZoom(newZoom);
//   };

//   return (
//     <div
//       style={{
//         position: 'relative',
//         width: '100%',
//         height: 'auto',
//         overflow: 'hidden',
//       }}
//       onWheel={handleWheel}
//     >
//       <img
//         src={src}
//         alt="Resim"
//         style={{
//           transform: `scale(${zoom})`,
//           transition: 'transform 0.3s ease',
//         }}
//       />
//     </div>
//   );
// };

// export default ImageArea;






// import React, { useContext, useRef, useEffect, useState } from 'react';
// import { ImageContext } from '../../contexts/ImageContext';
// import { TargetBoxContext } from '../../contexts/TargetBoxContext';
// import { ChosenTargetBoxContext } from '../../contexts/ChosenTargetBoxContext';
// import TargetBox from '../TargetBox/TargetBox';
// import './ImageArea.css';

// const ImageArea = ({ src, alt }) => {
//   const { width: imageWidth, height: imageHeight } = useContext(ImageContext);
//   const { targetBoxes, updateSelectedBox } = useContext(TargetBoxContext);
//   const { selectBox } = useContext(ChosenTargetBoxContext);

//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(imageWidth / 2);
//   const [containerHeight, setContainerHeight] = useState(imageHeight / 2);
//   const [zoomLevel, setZoomLevel] = useState(1); // Başlangıçta zoom seviyesi 1 (normal boyut)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const handleBoxClick = (id) => {
//     updateSelectedBox(id);
//     selectBox(id);
//   };

//   const handleZoom = (event) => {
//     event.preventDefault();

//     const containerRect = containerRef.current.getBoundingClientRect();
//     const mouseX = event.clientX - containerRect.left; // Fare pozisyonu x
//     const mouseY = event.clientY - containerRect.top; // Fare pozisyonu y

//     const zoomDelta = event.deltaY > 0 ? -0.1 : 0.1; // Tekerleği aşağı kaydırıyorsa küçült, yukarı kaydırıyorsa büyüt
//     setZoomLevel((prevZoom) => {
//       const newZoom = prevZoom + zoomDelta;
//       return Math.max(0.1, Math.min(4, newZoom)); // Zoom seviyesini en fazla 4 ve en az 0.1 olarak sınırla
//     });

//     // Fare pozisyonuna göre görüntüyü yeniden konumlandır
//     const containerWidth = containerRef.current.clientWidth;
//     const containerHeight = containerRef.current.clientHeight;
//     const imageWidth = containerWidth / zoomLevel;
//     const imageHeight = containerHeight / zoomLevel;

//     const deltaX = mouseX * (1 / zoomLevel - 1 / (zoomLevel + zoomDelta));
//     const deltaY = mouseY * (1 / zoomLevel - 1 / (zoomLevel + zoomDelta));

//     containerRef.current.scrollTo({
//       left: containerRef.current.scrollLeft + deltaX,
//       top: containerRef.current.scrollTop + deltaY,
//       behavior: 'auto',
//     });
//   };

//   useEffect(() => {
//     if (containerRef.current) {
//       const minWidth = imageWidth / 2;
//       const minHeight = imageHeight / 2;
//       setContainerWidth(Math.max(minWidth, Math.min(imageWidth * 4, containerRef.current.clientWidth)));
//       setContainerHeight(Math.max(minHeight, Math.min(imageHeight * 4, containerRef.current.clientHeight)));
//     }
//   }, [imageWidth, imageHeight, zoomLevel]);

//   return (
//     <div
//       className="image-area"
//       ref={containerRef}
//       style={{ width: containerWidth, height: containerHeight, overflow: 'hidden' }}
//       onWheel={handleZoom}
//       onMouseMove={(event) => setMousePosition({ x: event.clientX, y: event.clientY })}
//     >
//       <img
//         src={src}
//         alt={alt}
//         className="image-area-img"
//         style={{
//           maxWidth: '100%',
//           maxHeight: '100%',
//           transform: `scale(${zoomLevel})`,
//           transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
//         }}
//       />
//       {targetBoxes.map((box) => (
//         <TargetBox
//           key={box.id}
//           id={box.id}
//           x={(box.x / imageWidth) * 100}
//           y={(box.y / imageHeight) * 100}
//           width={box.width}
//           height={box.height}
//           onClick={() => handleBoxClick(box.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default ImageArea;

















// import React, { useContext, useRef, useEffect, useState } from 'react';
// import { ImageContext } from '../../contexts/ImageContext';
// import { TargetBoxContext } from '../../contexts/TargetBoxContext';
// import { ChosenTargetBoxContext } from '../../contexts/ChosenTargetBoxContext';
// import TargetBox from '../TargetBox/TargetBox';
// import './ImageArea.css';

// const ImageArea = ({ src, alt }) => {
//   const { width: imageWidth, height: imageHeight } = useContext(ImageContext);
//   const { targetBoxes, updateSelectedBox } = useContext(TargetBoxContext);
//   const { selectBox } = useContext(ChosenTargetBoxContext);

//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(imageWidth / 2);
//   const [containerHeight, setContainerHeight] = useState(imageHeight / 2);

//   const handleBoxClick = (id) => {
//     updateSelectedBox(id);
//     selectBox(id);
//   };

//   useEffect(() => {
//     if (containerRef.current) {
//       const minWidth = imageWidth / 2;
//       const minHeight = imageHeight / 2;
//       setContainerWidth(Math.max(minWidth, Math.min(imageWidth * 4, containerRef.current.clientWidth)));
//       setContainerHeight(Math.max(minHeight, Math.min(imageHeight * 4, containerRef.current.clientHeight)));
//     }
//   }, [imageWidth, imageHeight]);

//   return (
//     <div className="image-area" ref={containerRef} style={{ width: containerWidth, height: containerHeight }}>
//       <img src={src} alt={alt} className="image-area-img" style={{ maxWidth: '100%', maxHeight: '100%' }} />
//       {targetBoxes.map((box) => (
//         <TargetBox
//           key={box.id}
//           id={box.id}
//           x={(box.x / imageWidth) * 100}
//           y={(box.y / imageHeight) * 100}
//           width={box.width}
//           height={box.height}
//           onClick={() => handleBoxClick(box.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default ImageArea;