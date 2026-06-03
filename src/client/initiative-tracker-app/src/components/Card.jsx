import { useRef, useEffect, useState } from 'react';
import Trash from '../icons/Trash';

const Card = ({ card }) => {
    const body = JSON.parse(card.body);
    const colors = JSON.parse(card.colors);

    // For calculating and updating position of a card
    // Consists of 2 things:
    // 1. Dragging card (check where it is, where it ended and update positiong)
    // 2. Letting go (should release note and stop updating position)

    // 1. Clicking and moving card
    const [position, setPosition] = useState(JSON.parse(card.position));
    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const mouseMove = (e) => {
      const mouseMoveDir = {
        // Calculating position, need to know how much was the card moved
        // Where it ended - from where it was dragged
        x: mouseStartPos.x - e.clientX,
        y: mouseStartPos.y - e.clientY
      }

      // Update position for next move
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      // Update card position
      setPosition({
        x: cardRef.current.offsetLeft - mouseMoveDir.x,
        y: cardRef.current.offsetTop - mouseMoveDir.y
      })
    };

    const mouseDown = (e) => {
      // Started clicking with mouse
      // This is start poisiton
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      // Preparing as we are clicking to check for either movement or drop
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener("mouseup", mouseUp);
    };

    // 2. Dropping
    const mouseUp = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };

    // Make sure size of card expands as text area grow
    const textAreaRef = useRef(null);
    const autoGrow = (textAreaRef) => {
      const { current } = textAreaRef;
      // Limit card growth
      if(current.scrollHeight > window.innerHeight * 0.40) return;
      // Reset height first
      current.style.height = "auto";
      // Set the new height
      current.style.height = current.scrollHeight + "px";
    };
    
    // So that we can use autoGrow on load
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
    onMouseDown={ mouseDown }
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
