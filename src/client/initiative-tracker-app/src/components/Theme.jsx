import { useState, useContext } from "react";
import axios from "axios";

import { CardContext } from "../context/CardContext";
import Player from "../icons/Player";
import Hidden from "../icons/Hidden";

// For now, color is indicative of type of role a character
export const Theme = ({ theme }) => {
	// Tracking general states for query
	const [err, setError] = useState(null);
	const { selectedCharacter, characters, setCharacters } =
		useContext(CardContext);

	// To set icon corresponding to theme/value
	const MENU_ICONS = {
		Player: Player,
		Hidden: Hidden,
	};
	const SelectedIcon = MENU_ICONS[theme.icon];

	const changeTheme = () => {
		try {
			const currCardIndex = characters.findIndex(
				(character) => character._id === selectedCharacter._id,
			);

			const updateCard = {
				...characters[currCardIndex],
				role: theme.id,
			};

			const newCards = [...characters];
			newCards[currCardIndex] = updateCard;
			setCharacters(newCards);

			const updateCardTheme = async () => {
				try {
					// Format payload
					const payload = {
						role: theme.id,
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

			updateCardTheme();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div onClick={changeTheme} className={`theme ${theme.style}`}>
			<SelectedIcon />
		</div>
	);
};
