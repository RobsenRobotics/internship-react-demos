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

// import React from 'react';
// import RectangleROI from './components/ROI/RectangleROI';
// import CircleROI from './components/ROI/CircleROI';
// import TriangleROI from './components/ROI/TriangleROI';
// import { TargetBoxProvider } from './contexts/TargetBoxContext';

// const App = () => {
//   const handleClick = (id) => {
//     console.log(`Shape with ID ${id} clicked`);
//   };

//   return (
//     <TargetBoxProvider>
//       <div>
//         <RectangleROI id={1} x={50} y={50} width={200} height={100} onClick={handleClick} />
//         <CircleROI id={2} x={300} y={50} width={100} height={100} onClick={handleClick} />
//         <TriangleROI id={3} x={500} y={50} width={100} height={100} onClick={handleClick} />
//       </div>
//     </TargetBoxProvider>
//   );
// };

// export default App;


// import React from 'react';
// import ReactDOM from 'react-dom';
// import RotatingRectangle from './components/RotatingRectangleRotatingRectangle';
// import './RotatingRectangle.css';

// const App = () => {
//   return (
//     <div>
//       <h1>Rotating Rectangle</h1>
//       <RotatingRectangle />
//     </div>
//   );
// };


// import React from 'react';
// import ImageViewerArea from './components/ImageViewerArea/ImageViewerArea';
// import Sidebar from './components/Sidebar/Sidebar';
// import { ImageProvider } from './contexts/ImageContext';
// import './App.css';
// import RotatingRectangle from './components/RotatingRectangle/RotatingRectangle';


// function App() {
//   return (
//     <ImageProvider>
//       <RotatingRectangle />
//     </ImageProvider>
//   );
// }
// export default App;
