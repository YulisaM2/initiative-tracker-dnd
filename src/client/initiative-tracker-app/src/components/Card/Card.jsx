import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";

import { autoGrow, bringToFront } from "../Card/Card.utils";
import { DeleteButton } from "../../components/Controls/DeleteButton";
import { Stat } from "./Stat";
import { Bonus } from "./Bonus";
import Notes from "./Notes";
import Spinner from "../../icons/Spinner";
import { CardContext } from "../../context/CardContext";

const Card = ({ character }) => {
	// Tracking general states for query
	const [loading, setLoading] = useState(false);

	const handleFieldLoading = (isLoading) => {
		setLoading(isLoading);
	};

	const [err, setError] = useState(null);
	const keyUpTimer = useRef(null);

	const { enableScreenDrag, setSelectedCharacter, updateCharacterInContext } =
		useContext(CardContext);

	// Getting values to populate card
	const characterName = character.name || "";
	const role = character.role;
	const characterAC = character?.combatHighlights?.armorClass || "";
	const characterPP = character?.combatHighlights?.passivePercept || "";
	const hasBardicInsp = character?.hasBardicInsp || "";
	const hasHeroicInsp = character?.hasHeroicInsp || "";
	const characterNotes = character?.notes || "";

	// Setup for drag and drop
	const [position, setPosition] = useState(character.position);
	let mouseStartPos = { x: 0, y: 0 };
	const cardRef = useRef(null);

	// Set up for card expansion
	const textAreaNameRef = useRef(null);
	const limitName = window.innerHeight * 0.15;

	// So that we can use autoGrow on load (adjust size if prefilled db)
	useEffect(() => {
		autoGrow(textAreaNameRef);
		bringToFront(cardRef.current);
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
		setSelectedCharacter(character);
		bringToFront(cardRef.current);

		// Should not be able to drag it if feature is locked
		if (enableScreenDrag) return;

		// This is start poisiton
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

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
			const response = await axios.patch(
				`${import.meta.env.VITE_API_CHAR_URL}/${character._id}`,
				payload,
			);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const updateCharacterName = async (newName) => {
		try {
			setLoading(true);

			// Format payload
			const payload = {
				name: newName,
			};

			// Ping db
			const response = await axios.patch(
				`${import.meta.env.VITE_API_CHAR_URL}/${character._id}`,
				payload,
			);
			if (response.data) updateCharacterInContext(character._id, response.data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	// As we update any area in the card, trigger auto save
	const handleKeyUp = async () => {
		setLoading(true);
		const delay = 1000; // ms

		// If we were already tracking, restart as new input was introduced
		if (keyUpTimer.current) clearTimeout(keyUpTimer.current);

		// Set card update after delay
		keyUpTimer.current = setTimeout(() => {
			updateCardPos(cardRef.current);
			updateCharacterName(textAreaNameRef.current.value);
		}, delay);
	};

	return (
		<div
			className={`card ${role === "Player" ? "player-card" : "hidden-card"} react-transform-component-no-drag`}
			ref={cardRef}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}
			onMouseDown={(e) => {
				// Updating context as focus shifted with click
				mouseDown(e);
			}}
			onFocus={() => {
				bringToFront(cardRef.current);
				setSelectedCharacter(character);
			}}
		>
			<div className='card-header'>
				{loading && (
					<div className='card-saving'>
						<Spinner />
					</div>
				)}
				<DeleteButton className='test' id={character._id} />
			</div>
			<div className='card-body'>
				<textarea
					ref={textAreaNameRef}
					className='character-name-input react-transform-component-no-drag'
					placeholder='Character Name'
					defaultValue={characterName}
					rows={1}
					onInput={() => {
						autoGrow(textAreaNameRef, limitName);
					}}
					onKeyUp={handleKeyUp}
					onKeyDown={(e) => e.stopPropagation()}
				></textarea>
				<div className='stats-container'>
					<Stat
						className='armor-class-input react-transform-component-no-drag'
						statName='armorClass'
						label='AC'
						defaultValue={characterAC}
						id={character._id}
						onLoadingChange={handleFieldLoading}
					></Stat>
					<Stat
						className='passive-percept-input react-transform-component-no-drag'
						statName='passivePercept'
						label='PP'
						defaultValue={characterPP}
						id={character._id}
						onLoadingChange={handleFieldLoading}
					></Stat>
				</div>
				<div className='stats-container'>
					<Bonus
						className='bardic-insp-bttn react-transform-component-no-drag'
						bonusName='hasBardicInsp'
						defaultValue={hasBardicInsp}
						url={import.meta.env.VITE_API_BARDIC_INSPIRATION_URL}
						id={character._id}
						onLoadingChange={handleFieldLoading}
					></Bonus>
					<Bonus
						className='heroic-insp-bttn react-transform-component-no-drag'
						bonusName='hasHeroicInsp'
						defaultValue={hasHeroicInsp}
						url={import.meta.env.VITE_API_HEROIC_INSPIRATION_URL}
						id={character._id}
						onLoadingChange={handleFieldLoading}
					></Bonus>
				</div>
				<div className='notes-container'>
					<Notes
						className='react-transform-component-no-drag'
						defaultValue={characterNotes}
						url={import.meta.env.VITE_API_NOTES_URL}
						id={character._id}
						onLoadingChange={handleFieldLoading}
					></Notes>
				</div>
			</div>
		</div>
	);
};

export default Card;
