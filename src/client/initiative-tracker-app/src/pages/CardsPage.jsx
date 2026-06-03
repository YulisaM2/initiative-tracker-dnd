import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card.jsx';

// import { dummyData as cards } from '../assets/dummyData.js';
 
const CardsPage = () => {
  // Populate the page with cards based on the characters in the db.
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();

    async function loadCharacters() {
      try {
        // Ping db
        const response = await fetch(import.meta.env.VITE_API_URL, { signal: abortController.signal });
        if(!response.ok) 
          throw new Error(`HTTP error! status: ${response.status}`);
        
        // Update state with the fethed characters
        const res = await response.json();
        setCharacters(res);

      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
    
    // Cleanup on unmount
    return () => abortController.abort()
  }, []);

  if(loading) 
    return <p>Loading data...</p>;
  if(!err) 
    return <p>Error encountered: {err}</p>;

  return (
    <div>
      {
        // Render the cards with the character's data
        characters.map((char) => (
          <Card key={ char._id } card={ char } />
        ))
      }
    </div>
  );
}

export default CardsPage;
