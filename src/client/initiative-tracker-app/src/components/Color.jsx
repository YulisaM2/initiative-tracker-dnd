import { useState, useContext } from "react";
import axios from "axios";

import { CardContext } from "../context/CardContext";

// For now, color is indicative of type of role a character
export const Color = ({ color }) => {
	// Tracking general states for query
	const [err, setError] = useState(null);
	const { selectedCharacter, characters, setCharacters } =
		useContext(CardContext);

	const changeColor = () => {
		try {
			const currCardIndex = characters.findIndex(
				(character) => character._id === selectedCharacter._id,
			);

			const updateCard = {
				...characters[currCardIndex],
				role: color.id,
			};

			const newCards = [...characters];
			newCards[currCardIndex] = updateCard;
			setCharacters(newCards);

			const updateCardColor = async () => {
				try {
					// Format payload
					const payload = {
						role: color.id,
					};

					// Ping db
					const response = await axios.put(
						`${import.meta.env.VITE_API_CHAR_URL}/${selectedCharacter._id}`, // 1. URL
						payload,
					);
				} catch (error) {
					setError(error.message);
				}
			};

			updateCardColor();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div
			onClick={changeColor}
			className='color'
			style={{ backgroundColor: color.colorHeader }}
		></div>
	);
};
