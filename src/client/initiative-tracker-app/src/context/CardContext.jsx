import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const CardContext = createContext();

const CardProvider = ({ children }) => {
	// Populate the page with cards based on the characters in the db.
	const [characters, setCharacters] = useState([]);
	const [selectedCharacter, setSelectedCharacter] = useState(null);

	// Generic states
	const [loading, setLoading] = useState(true);
	const [err, setError] = useState(null);

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

	const contextData = {
		characters,
		setCharacters,
		selectedCharacter,
		setSelectedCharacter,
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
