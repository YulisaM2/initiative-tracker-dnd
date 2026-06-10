import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";

import { CardContext } from "../context/CardContext";
import { CONTROLS_ICONS } from "../assets/constants.js";
import {
	extractApiErrorMessage,
	handleContractValidation,
} from "./Card/helpers/Card.utils.js";

import { CharacterContract } from "../../../../contracts/index.js";

// For now, color is indicative of type of role a character
export const Theme = ({ theme }) => {
	// Tracking general states for query
	const { selectedCharacter, characters, setCharacters } =
		useContext(CardContext);

	const SelectedIcon = CONTROLS_ICONS[theme.icon];

	const changeTheme = () => {
		if (!selectedCharacter?._id) {
			toast.error("Please select a character first!");
			return;
		}
		try {
			// To check that the contract is fulfilled
			const testPayload = {
				role: theme.id,
			};

			// Validating
			const contractValidation = CharacterContract.safeParse(testPayload);

			// If invalid, stop
			if (handleContractValidation(contractValidation, "role", toast)) {
				return;
			}

			const currCardIndex = characters.findIndex(
				(character) => character._id === selectedCharacter._id,
			);

			const updateCard = {
				...characters[currCardIndex],
				role: contractValidation.data.role,
			};

			const newCards = [...characters];
			newCards[currCardIndex] = updateCard;
			setCharacters(newCards);

			const updateCardTheme = async () => {
				try {
					// If valid, format payload with data
					const payload = {
						role: contractValidation.data.role,
					};

					// Ping db
					const response = await axios.put(
						`${import.meta.env.VITE_API_CHAR_URL}/${selectedCharacter._id}`,
						payload,
					);
				} catch (error) {
					const cleanMsg = extractApiErrorMessage(error);
					toast.error(cleanMsg);
				}
			};

			updateCardTheme();
		} catch (error) {
			const cleanMsg = extractApiErrorMessage(error);
			toast.error(cleanMsg);
		}
	};

	return (
		<div onClick={changeTheme} className={`theme ${theme.style}`}>
			<SelectedIcon />
		</div>
	);
};
