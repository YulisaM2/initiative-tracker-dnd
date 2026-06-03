import { useRef, useEffect, useState } from 'react';
import { mouseDown, autoGrow, bringToFront } from '../Card/Card.utils';

import Trash from '../../icons/Trash';

const Card = ({ card }) => {
  console.log(card.genDetails.name);
  const body = card.genDetails.name;
  const color = "#FEE5FD";

  // Setup for drag and drop
  const [position, setPosition] = useState(JSON.parse(JSON.stringify({ x: 505, y: 10 })),);
  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  // Set up for card expansion
  const textAreaRef = useRef(null);
  
  // So that we can use autoGrow on load (adjust size if prefilled db)
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  return (
    <div className='card' ref={ cardRef }
    style={{ 
      backgroundColor: color,
      left: `${position.x}px`,
      top: `${position.y}px`,
    }}
    onMouseDown={ (e) => mouseDown(e, mouseStartPos, cardRef, setPosition)}
    onFocus={() => {bringToFront(cardRef.current)}}
    >
      <div className='card-header' style={{ backgroundColor: "#FED0FD" }}>
        <Trash />
      </div>
      <div className='card-body'>
        <textarea ref={ textAreaRef } 
          style={{ color: " #000000" }} 
          defaultValue={ body }
          onInput= { () => { autoGrow(textAreaRef) } }> 
        </textarea>
      </div>
    </div>
  );
};

export default Card;
