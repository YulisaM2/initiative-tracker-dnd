import React from 'react';
import Card from '../components/Card/Card.jsx';

import { dummyData as cards } from '../assets/dummyData.js';

const CardsPage = () => {
  return (
    <div>
      { 
        cards.map((card) => (
            <Card key={ card.$id }  card={ card }/>
        ))
      }
    </div>
  );
}

export default CardsPage;
