import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";

import { CardContext } from "../context/CardContext";
import { CONTROLS_ICONS } from "../assets/constants.js";

// For now, color is indicative of type of role a character
export const Theme = ({ theme }) => {
	// Tracking general states for query
	const { selectedCharacter, characters, setCharacters } =
		useContext(CardContext);

	const SelectedIcon = CONTROLS_ICONS[theme.icon];

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
					toast.error(error.message);
				}
			};

			updateCardTheme();
		} catch (error) {
			if (error.message?.includes("null"))
				toast.error("Don't forget to select the character!");
			else toast.error(error.message);
		}
	};

	return (
		<div onClick={changeTheme} className={`theme ${theme.style}`}>
			<SelectedIcon />
		</div>
	);
};
