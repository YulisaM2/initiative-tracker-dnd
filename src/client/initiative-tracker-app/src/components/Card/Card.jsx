import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";

import { autoGrow, bringToFront } from "../Card/Card.utils";
import { DeleteButton } from "../../components/DeleteButton";

const Card = ({ character, setCharacter }) => {
  // Tracking general states for query
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  const body = character.genDetails.name;
  const color = "#FEE5FD";

  // Setup for drag and drop
  const [position, setPosition] = useState(character.position);
  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  // Set up for card expansion
  const textAreaRef = useRef(null);

  // So that we can use autoGrow on load (adjust size if prefilled db)
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  // For calculating and updating position of a card
  // Consists of 2 things:
  // 1. Dragging card (check where it is, where it ended and update positiong)
  // 2. Letting go (should release note and stop updating position)

  // 1. Clicking and moving card
  const mouseMove = (e) => {
    const mouseMoveDir = {
      // Calculating position, need to know how much was the card moved
      // Where it ended - from where it was dragged
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    // Update position for next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    // Update card position
    const newPos = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPos);
  };

  // Limiting so card can not leave border of screen
  const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetTop = card.offsetTop - mouseMoveDir.y;

    return {
      x: offsetLeft < 0 ? 0 : offsetLeft,
      y: offsetTop < 0 ? 0 : offsetTop,
    };
  };

  const mouseDown = (e) => {
    // Clicking so it is selecting the card
    setCharacter(character);

    // This is start poisiton
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    bringToFront(cardRef.current);

    const handleMouseMove = (e) => {
      mouseMove(e);
    };

    // 2. Dropping and cleanup
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const newPos = setNewOffset(cardRef.current);
      updateCardPos(newPos);
    };

    // Preparing as we are clicking to check for either movement or drop
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Add persistance to the position of the cards by updating model
  const updateCardPos = async (newPos) => {
    try {
      // Format payload
      const payload = {
        position: {
          x: newPos.x,
          y: newPos.y,
        },
      };

      // Ping db
      console.log(payload);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_CHAR_URL}/${character._id}`,
        payload,
      );

      // 2. Log out the actual response data here safely
      console.log("Position updated:", response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: color,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => {
        // Updating context as focus shifted with click
        mouseDown(e);
      }}
      onFocus={() => {
        bringToFront(cardRef.current);
        setCharacter(character);
      }}
    >
      <div className="card-header" style={{ backgroundColor: "#FED0FD" }}>
        <DeleteButton
          className="test"
          id={character._id}
          setCharacter={setCharacter}
        />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: " #000000" }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default Card;
