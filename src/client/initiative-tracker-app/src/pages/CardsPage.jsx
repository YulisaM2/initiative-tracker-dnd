import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card/Card.jsx';
import { CardContext } from '../context/CardContext.jsx';

// import { dummyData as cards } from '../assets/dummyData.js';
 
const CardsPage = () => {
  const { characters, setSelectedCharacter } = useContext(CardContext);

  return (
    <div>
      {
        // Render the cards with the character's data
        characters.map((character) => (
          <Card key={ character._id } character={ character } setCharacter={ setSelectedCharacter }/>
        ))
      }
    </div>
  );
}

export default CardsPage;
