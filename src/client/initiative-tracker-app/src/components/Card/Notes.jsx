import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";

import { autoGrow } from "../Card/Card.utils";
import { CardContext } from "../../context/CardContext";

import Divider from "../../icons/Divider";

const Notes = ({
	id,
	className,
	url,
	defaultValue,
	onLoadingChange,
	onInput,
}) => {
	// Tracking general states for query
	const [err, setError] = useState(null);
	const { updateCharacterInContext } = useContext(CardContext);
	const saveTimer = useRef(null);
	const delay = 1000;

	// Setup for card expanison
	const textAreaNotesRef = useRef(null);
	const limitNotes = window.innerHeight * 0.4;

	// Controlling how often to query db (avoid spamming)
	// Timmer will trigger when component unmounts (updates)
	// Cleanup here to restart evaluation
	useEffect(() => {
		autoGrow(textAreaNotesRef, limitNotes);
		return () => {
			if (saveTimer.current) clearTimeout(saveTimer.current);
		};
	}, []);

	const updateNotes = async (e) => {
		if (onLoadingChange) onLoadingChange(true);
		if (saveTimer.current) clearTimeout(saveTimer.current);

		// Delay before firing stat update
		saveTimer.current = setTimeout(async () => {
			try {
				// Format payload
				const payload = {
					notes: value,
				};

				// Ping db
				const response = await axios.patch(
					`${import.meta.env.VITE_API_CHAR_URL}/${id}/${url}`,
					payload,
				);

				if (response.data) updateCharacterInContext(id, response.data);
			} catch (error) {
				setError(error.message);
			} finally {
				if (onLoadingChange) onLoadingChange(false);
			}
		}, delay);
	};
	return (
		<div className='notes-section'>
			<Divider className='notes-divider-line' />
			<textarea
				ref={textAreaNotesRef}
				className={`notes-textarea ${className || ""}`}
				placeholder='Notes...'
				defaultValue={defaultValue}
				onKeyUp={updateNotes}
				onKeyDown={(e) => e.stopPropagation()}
				onInput={() => {
					autoGrow(textAreaNotesRef, limitNotes);
				}}
				onChange={(e) => {
					if (onInput) onInput(e);
				}}
			></textarea>
		</div>
	);
};

export default Notes;
