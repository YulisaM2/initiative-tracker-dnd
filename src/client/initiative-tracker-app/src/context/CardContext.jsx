import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { DELAY_CLEAN_SELECTED } from "../assets/constants";

export const CardContext = createContext();

const CardProvider = ({ children }) => {
	// Populate the page with cards based on the characters in the db.
	const [characters, setCharacters] = useState([]);
	const [selectedCharacter, setSelectedCharacter] = useState(null);

	// Generic states
	const [loading, setLoading] = useState(true);
	const [err, setError] = useState(null);

	// For navigating the screen with drag
	const [enableScreenDrag, setScreenDrag] = useState(false);

	const updateCharacterInContext = (characterId, updatedCharacter) => {
		setCharacters((prevCharacters) =>
			prevCharacters.map(
				(char) => (char._id === characterId ? updatedCharacter : char), // 🔴 Swap the whole object directly
			),
		);
	};

	useEffect(() => {
		async function loadCharacters() {
			try {
				// Ping db
				const response = await axios.get(import.meta.env.VITE_API_CHAR_URL);

				// Update state with the fethed characters
				const res = await response.data;
				setCharacters(res);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}

		loadCharacters();
	}, []);

	// To avoid accidents
	// Intention is determined by selecting card and doing something with it
	// If too much time passes, user focus potentially changed
	// This will avoid triggering updates to that previous selection in that case
	useEffect(() => {
		if (!selectedCharacter) return;

		const timer = setTimeout(() => {
			setSelectedCharacter(null);
		}, DELAY_CLEAN_SELECTED);

		// Restart timer
		return () => clearTimeout(timer);
	}, [selectedCharacter]);

	const contextData = {
		characters,
		setCharacters,
		selectedCharacter,
		setSelectedCharacter,
		enableScreenDrag,
		setScreenDrag,
		updateCharacterInContext,
	};

	return (
		<CardContext.Provider value={contextData}>
			{loading ? (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
					}}
				></div>
			) : (
				children
			)}
		</CardContext.Provider>
	);
};

export default CardProvider;
