import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";

import { MaxHpForm } from "./MaxHpForm";
import { HpDisplay } from "./HpDisplay";
import { CardContext } from "../../../context/CardContext";
import { DELAY_SPINNER_TRIGGER } from "../../../assets/constants";
import { extractApiErrorMessage } from "../helpers/Card.utils";

export const MaxHp = ({
	id,
	className,
	defaultValue,
	currentValue,
	tempValue,
	onLoadingChange,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const { updateCharacterInContext } = useContext(CardContext);

	const hasMaxHp =
		defaultValue !== undefined &&
		defaultValue !== null &&
		defaultValue !== "" &&
		defaultValue !== 0;

	const handleHpModifier = async (actionType, amount) => {
		if (onLoadingChange) onLoadingChange(true);

		let updatedData = null;

		try {
			const payload = { actionType, amount };

			const [response] = await Promise.all([
				axios.patch(
					`${import.meta.env.VITE_API_CHAR_URL}/${id}/${import.meta.env.VITE_API_MODIFY_HP_URL}`,
					payload,
				),
				new Promise((resolve) => setTimeout(resolve, DELAY_SPINNER_TRIGGER)),
			]);

			if (response.data) {
				updatedData = response.data;
			}
		} catch (error) {
			const cleanMsg = extractApiErrorMessage(error);
			toast.error(cleanMsg);
		} finally {
			if (onLoadingChange) onLoadingChange(false);
			if (updatedData) {
				updateCharacterInContext(id, updatedData);
			}
		}
	};

	const handleFormLoadingChange = (loadingState) => {
		setIsSaving(loadingState);
		if (onLoadingChange) onLoadingChange(loadingState);
	};

	if (!hasMaxHp || isEditing || isSaving) {
		return (
			<MaxHpForm
				id={id}
				className={`stat ${className || ""}`}
				defaultValue={defaultValue}
				onLoadingChange={handleFormLoadingChange}
				onSaveSuccess={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<HpDisplay
			id={id}
			className={`stat ${className || ""}`}
			maxHpValue={defaultValue}
			currHpValue={currentValue}
			tempValue={tempValue}
			handleHpModifier={handleHpModifier}
		/>
	);
};
