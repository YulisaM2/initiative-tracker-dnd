import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card/Card.jsx';
import { CardContext } from '../context/CardContext.jsx';

// import { dummyData as cards } from '../assets/dummyData.js';
 
const CardsPage = () => {
  const { characters, setCharacters } = useContext(CardContext);

  return (
    <div>
      {
        // Render the cards with the character's data
        characters.map((char) => (
          <Card key={ char._id } char={ char } setChars={ setCharacters }/>
        ))
      }
    </div>
  );
}

export default CardsPage;
