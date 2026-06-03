import { useRef } from 'react';
import Trash from '../icons/Trash';

export const DeleteButton = ({ id, setChars }) => {
    // Check that intention wasn't to delete, but to drag card
    // Consists of :
    // 1. Validating if there was movement in a short period of time 
    // 2. If it was an instant click, it should delete
    const coordsRef = useRef({ x: 0, y: 0 });
    const startTimeRef = useRef(0);
    const isDraggingRef = useRef(false);

    const handleMouseDown = (e) => {
        // Record starting position and time
        coordsRef.current = { x: e.clientX, y: e.clientY };
        startTimeRef.current = Date.now();
        isDraggingRef.current = false;
    };

    const handleMouseMove = (e) => {
        // If we already know the user is dragging, no need to keep calculating
        if(isDraggingRef.current)
            return;

        const minDistance = 5; // tolerance threshold
        const distanceX = Math.abs(e.clientX - coordsRef.current.x);
        const distanceY = Math.abs(e.clientY - coordsRef.current.y);

        // If moved more than tolerated, then it should be considered a drag
        if (distanceX > minDistance || distanceY > minDistance) {
            isDraggingRef.current = true;
        }
    };

    const handleMouseUp = () => {
        const clickDuration = Date.now() - startTimeRef.current;
        const maxClickDuration = 200; // ms
        
        // 1. & 2. Deleting only if click was fast and not long
        if (!isDraggingRef.current && clickDuration < maxClickDuration) {
            handleDelete();
        }
    };


    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
                method: 'DELETE',
            });

            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }   

            // Update the characters list by removing the deleted character
            setChars(prevChars => prevChars.filter(char => char._id !== id));
        } catch (error) {
            console.error('Error deleting character:', error);
        }
    };

    return (
        <div 
            onMouseDown={ handleMouseDown }
            onMouseMove={ handleMouseMove }
            onMouseUp={ handleMouseUp }
            onMouseLeave={ () => { isDraggingRef.current = true; } } // Resetting flag
            >
            <Trash />
        </div>
    );
};  