// Updating z index so card can be viewed without obstructions
export const bringToFront = (selectedCard) => {
    selectedCard.style.zIndex = 999;
    Array.from(document.getElementsByClassName("card")).forEach((card) =>{
        if(card !== selectedCard)
            card.style.zIndex = selectedCard.style.zIndex - 1; // Make sure it's under desired card
    });
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