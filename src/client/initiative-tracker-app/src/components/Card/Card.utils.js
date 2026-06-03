import { useState } from 'react';

// For calculating and updating position of a card
    // Consists of 2 things:
    // 1. Dragging card (check where it is, where it ended and update positiong)
    // 2. Letting go (should release note and stop updating position)

// 1. Clicking and moving card
const mouseMove = (e, mouseStartPos, cardRef, setPosition) => {
    const mouseMoveDir = {
    // Calculating position, need to know how much was the card moved
    // Where it ended - from where it was dragged
    x: mouseStartPos.x - e.clientX,
    y: mouseStartPos.y - e.clientY
    }

    // Update position for next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    // Limiting so card can not leave border of screen
    const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
        const offsetLeft = card.offsetLeft - mouseMoveDir.x;
        const offsetTop = card.offsetTop - mouseMoveDir.y;

        return {
            x: offsetLeft < 0 ? 0 : offsetLeft,
            y: offsetTop < 0 ? 0 : offsetTop,
        }
    }

    // Update card position
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
};

// Updating z index so card can be viewed without obstructions
export const bringToFront = (selectedCard) => {
    selectedCard.style.zIndex = 999;
    Array.from(document.getElementsByClassName("card")).forEach((card) =>{
        console.log(card + " " + card !== selectedCard);
        if(card !== selectedCard)
            card.style.zIndex = selectedCard.style.zIndex - 1; // Make sure it's under desired card
    });
}

export const mouseDown = (e, mouseStartPos, cardRef, setPosition) => {
    // Started clicking with mouse
    // This is start poisiton
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    bringToFront(cardRef.current);

    const handleMouseMove = (e) => {
        mouseMove(e, mouseStartPos, cardRef, setPosition);
    };

    // 2. Dropping and cleanup
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    // Preparing as we are clicking to check for either movement or drop
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

// Make sure size of card expands as text area grow
export const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    // Limit card growth
    if(current.scrollHeight > window.innerHeight * 0.40) return;
    // Reset height first
    current.style.height = "auto";
    // Set the new height
    current.style.height = current.scrollHeight + "px";
};

