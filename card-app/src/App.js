import React, { useState } from 'react';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
  const [showButtons, setShowButtons] = useState(true);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div>
      <Navbar showButtons={showButtons} toggleButtons={toggleButtons} />
      <div>
        <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default App;
