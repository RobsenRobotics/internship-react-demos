import React, { useState } from 'react';
import Card from './Card';
import './Cards.css'; // Stil dosyasını içe aktar

const Cards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      data: {
        FullName: 'John Doe',
        Age: 25,
        IsStudent: true,
        EndDate: new Date().toISOString(),
      },
      cardPosition: { x: 0, y: 0 },
    },
    {
      id: 2,
      data: {
        FullName: 'Jane Smith',
        Age: 30,
        IsStudent: false,
        EndDate: new Date().toISOString(),
      },
      cardPosition: { x: 0, y: 0 },
    },
  ]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleAddCard = () => {
    const newCard = {
      id: cards.length + 1,
      data: {
        FullName: `New Person ${cards.length + 1}`,
        Age: 20,
        IsStudent: false,
        EndDate: new Date().toISOString(),
      },
      cardPosition: { x: 0, y: 0 },
    };
    setCards([...cards, newCard]);
  };

  const handleSelectCard = (id) => {
    setSelectedCardId(id);
  };

  const handleExportClick = () => {
    const exportData = cards.map((card) => ({
      id: card.id,
      data: card.data,
      cardPosition: card.cardPosition,
    }));
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'cardsData.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const importedData = JSON.parse(e.target.result);
          setCards(importedData);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleCardDrag = (id, newPosition) => {
    setCards(cards.map((card) =>
      card.id === id ? { ...card, cardPosition: newPosition } : card
    ));
  };

  const handleCardUpdate = (id, updatedData) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, data: updatedData } : card
    );
    setCards(updatedCards);
  };

  const handleSaveCard = (id, updatedData) => {
    console.log('Saving card with id:', id);
    console.log('Updated data:', updatedData);
  };
  
  return (
    <div className="container">
      <div className="buttonsContainer">
        <button onClick={handleImportClick} className="button">Import</button>
        <button onClick={handleExportClick} className="button">Export</button>
      </div>
      <div className="cardsContainer">
        {cards.map((card) => (
          <Card
          key={card.id}
          id={card.id}
          data={card.data}
          cardPosition={card.cardPosition}
          isSelected={card.id === selectedCardId}
          onSelect={() => handleSelectCard(card.id)}
          onDrag={(newPosition) => handleCardDrag(card.id, newPosition)}
          onUpdate={handleCardUpdate}
          onSave={(id, updatedData) => handleSaveCard(id, updatedData)}
        />
        
        ))}
      </div>
      <button onClick={handleAddCard} className="addButton">
        Add Card
      </button>
    </div>
  );
};

export default Cards;
