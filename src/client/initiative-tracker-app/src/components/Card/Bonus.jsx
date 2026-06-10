import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";

import { CardContext } from "../../context/CardContext";
import { DELAY_SPINNER_TRIGGER, BONUS_ICONS } from "../../assets/constants.js";
import {
	extractApiErrorMessage,
	handleContractValidation,
} from "./helpers/Card.utils";

import { CharacterContract } from "../../../../../contracts/index.js";

export const Bonus = ({
	id,
	className,
	bonusName,
	url,
	defaultValue,
	onLoadingChange,
}) => {
	// Tracking general states for query
	const { updateCharacterInContext } = useContext(CardContext);

	const SelectedIcon = BONUS_ICONS[bonusName];

	// To apply style of inactive vs active
	const combinedButtonClass = `bonus-bttn ${className || ""} ${defaultValue ? "active" : "inactive"}`;
	const updateBonus = async (e) => {
		if (e) e.preventDefault();

		if (onLoadingChange) onLoadingChange(true);

		try {
			// To check that the contract is fulfilled
			const testPayload = {
				[bonusName]: !defaultValue,
			};

			// Validating
			const contractValidation = CharacterContract.safeParse(testPayload);

			// If invaid, stop
			if (
				handleContractValidation(
					contractValidation,
					bonusName,
					onLoadingChange,
					toast,
				)
			) {
				return;
			}

			// If valid, format payload with data
			const payload = {
				[bonusName]: contractValidation.data[bonusName],
			};

			// Ping db
			const [response] = await Promise.all([
				axios.patch(
					`${import.meta.env.VITE_API_CHAR_URL}/${id}/${url}`,
					payload,
				),
				new Promise((resolve) => setTimeout(resolve, DELAY_SPINNER_TRIGGER)),
			]);

			if (response.data) updateCharacterInContext(id, response.data);
		} catch (error) {
			const cleanMsg = extractApiErrorMessage(error);
			toast.error(cleanMsg);
		} finally {
			if (onLoadingChange) onLoadingChange(false);
		}
	};

	return (
		<div className='stat-container'>
			<button
				className={combinedButtonClass}
				onClick={updateBonus}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<SelectedIcon />
			</button>
		</div>
	);
};
