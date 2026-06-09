import { useState, useContext } from "react";
import axios from "axios";

import { MaxHpForm } from "./MaxHpForm";
import { MaxHpDisplay } from "./MaxHpDisplay";
import { CardContext } from "../../../context/CardContext";

export const MaxHp = ({
	id,
	className,
	defaultValue,
	currentValue,
	tempValue,
	onLoadingChange,
}) => {
	// Allows the user to click the text to edit the Max HP later if needed
	const [isEditing, setIsEditing] = useState(false);
	const { updateCharacterInContext } = useContext(CardContext);

	const hasMaxHp =
		defaultValue !== undefined &&
		defaultValue !== null &&
		defaultValue !== "" &&
		defaultValue !== 0;

	const handleHpModifier = async (actionType, amount) => {
		if (onLoadingChange) onLoadingChange(true);
		try {
			const payload = { actionType, amount };

			// Pointing to your new specialized backend route
			const response = await axios.patch(
				`${import.meta.env.VITE_API_CHAR_URL}/${id}/${import.meta.env.VITE_API_MODIFY_HP_URL}`,
				payload,
			);

			if (response.data) {
				updateCharacterInContext(id, response.data);
			}
		} catch (error) {
			console.error("Failed to update health:", error.message);
		} finally {
			if (onLoadingChange) onLoadingChange(false);
		}
	};

	// Show the form if there is no value OR if the user is editing it
	if (!hasMaxHp || isEditing) {
		return (
			<MaxHpForm
				id={id}
				className={`stat ${className || ""}`}
				defaultValue={defaultValue}
				onLoadingChange={onLoadingChange}
				onSaveSuccess={() => setIsEditing(false)}
			/>
		);
	}

	// Show the sleek display layout once Max HP is present
	return (
		<MaxHpDisplay
			id={id}
			className={`stat ${className || ""}`}
			maxHpValue={defaultValue}
			currHpValue={currentValue}
			tempValue={tempValue}
			onEdit={() => setIsEditing(true)}
			handleHpModifier={handleHpModifier}
		/>
	);
};
