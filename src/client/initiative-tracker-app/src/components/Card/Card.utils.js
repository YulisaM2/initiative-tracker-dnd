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

    // Update card position
    setPosition(() => ({
        x: cardRef.current.offsetLeft - mouseMoveDir.x,
        y: cardRef.current.offsetTop - mouseMoveDir.y
    }));
};

export const mouseDown = (e, mouseStartPos, cardRef, setPosition) => {
    // Started clicking with mouse
    // This is start poisiton
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

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
    
