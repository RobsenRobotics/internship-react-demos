import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Card.css';

const Card = ({ id, data, cardPosition, isSelected, onSelect, onDrag, onUpdate, onSave, handleCardSave }) => {
  const [cardData, setCardData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setCardData(data);
    }
  }, [isSelected, data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        if (isEditing) {
          handleSaveChanges();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [isEditing]);

  const handleFieldClick = (field) => {
    if (isEditing) {
      if (field === 'IsStudent') {
        const updatedData = { ...cardData, IsStudent: !cardData.IsStudent };
        setCardData(updatedData);
        onUpdate(id, updatedData);  // Değişiklikleri onUpdate ile hemen yansıt
      } else if (field === 'FullName' || field === 'EndDate') {
        let newValue = prompt(`Enter new ${field}:`, cardData[field]);
        if (field === 'EndDate') {
          newValue = new Date(newValue).toISOString();
        }
        if (newValue !== null && newValue.toString().trim() !== '') {
          const updatedData = { ...cardData, [field]: newValue };
          setCardData(updatedData);
          onUpdate(id, updatedData);
        }
      }
    }
  };

  const handleAgeSelect = (e) => {
    const newAge = parseInt(e.target.value, 10);
    const updatedData = { ...cardData, Age: newAge };
    setCardData(updatedData);
    onUpdate(id, updatedData); 
  };

  const handleCardClick = () => {
    if (!isEditing) {
      onSelect();
    }
  };

  const handleDateChange = (date) => {
    const updatedData = { ...cardData, EndDate: date.toISOString() };
    setCardData(updatedData);
    onUpdate(id, updatedData); 
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    onSave(id, cardData); 
  };

  const handleStop = (e, { x, y }) => {
    onDrag({ x, y });
  };

  return (
    <Draggable
      cancel="input, select, textarea"
      onStop={handleStop}
      position={cardPosition}
    >
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={isSelected ? "card selectedCard" : "card"}
      >
        <h2 onClick={() => handleFieldClick('FullName')} className="clickable">
          {isEditing ? (
            <input
              type="text"
              value={cardData.FullName}
              onChange={(e) => {
                const updatedData = { ...cardData, FullName: e.target.value };
                setCardData(updatedData);
                onUpdate(id, updatedData); 
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            cardData.FullName
          )}
        </h2>
        {isSelected && isEditing ? (
          <select
            value={cardData.Age}
            onChange={handleAgeSelect}
            onClick={(e) => e.stopPropagation()}
          >
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        ) : (
          <p className="clickable">
            Age: {cardData.Age}
          </p>
        )}
        <p onClick={() => handleFieldClick('IsStudent')} className="clickable">
          Student: {isEditing ? (
            <input
              type="checkbox"
              checked={cardData.IsStudent}
              onChange={() => {
                const updatedData = { ...cardData, IsStudent: !cardData.IsStudent };
                setCardData(updatedData);
                onUpdate(id, updatedData);  
              }}
            />
          ) : (
            cardData.IsStudent.toString()
          )}
        </p>
        <div style={{ position: 'relative' }}>
          {isSelected && isEditing ? (
            <DatePicker
              selected={cardData.EndDate ? new Date(cardData.EndDate) : null}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="datePicker"
            />
          ) : (
            <p onClick={() => handleFieldClick('EndDate')} className="clickable">
              End Date: {new Date(cardData.EndDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default Card;
