import { useRef, useEffect, useState } from 'react';
import { mouseDown, autoGrow, bringToFront } from '../Card/Card.utils';

import Trash from '../../icons/Trash';

const Card = ({ card }) => {
    const body = JSON.parse(card.body);
    const colors = JSON.parse(card.colors);

    // Setup for drag and drop
    const [position, setPosition] = useState(JSON.parse(card.position));
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
      backgroundColor: colors.colorBody,
      left: `${position.x}px`,
      top: `${position.y}px`,
    }}
    onMouseDown={ (e) => mouseDown(e, mouseStartPos, cardRef, setPosition)}
    onFocus={() => {bringToFront(cardRef.current)}}
    >
      <div className='card-header' style={{ backgroundColor: colors.colorHeader }}>
        <Trash />
      </div>
      <div className='card-body'>
        <textarea ref={ textAreaRef } 
          style={{ color: colors.colorText }} 
          defaultValue={ body }
          onInput= { () => { autoGrow(textAreaRef) } }> 
        </textarea>
      </div>
    </div>
  );
};

export default Card;
