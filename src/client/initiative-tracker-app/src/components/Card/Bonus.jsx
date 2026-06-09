import { useState, useContext } from "react";
import axios from "axios";

import { CardContext } from "../../context/CardContext";
import BassClef from "../../icons/Bonus/BassClef";
import Hero from "../../icons/Bonus/Hero";

export const Bonus = ({
	id,
	className,
	bonusName,
	url,
	defaultValue,
	onLoadingChange,
}) => {
	// Tracking general states for query
	const [err, setError] = useState(null);
	const { updateCharacterInContext } = useContext(CardContext);
	const delay = 300;

	// To set icon corresponding to theme/value
	const INSP_ICONS = {
		hasBardicInsp: BassClef,
		hasHeroicInsp: Hero,
	};
	const SelectedIcon = INSP_ICONS[bonusName];

	// To apply style of inactive vs active
	const combinedButtonClass = `bonus-bttn ${className || ""} ${defaultValue ? "active" : "inactive"}`;
	const updateBonus = async (e) => {
		if (e) e.preventDefault();

		if (onLoadingChange) onLoadingChange(true);

		try {
			// Format payload
			const payload = {
				[bonusName]: !defaultValue,
			};

			// Ping db
			const [response] = await Promise.all([
				axios.patch(
					`${import.meta.env.VITE_API_CHAR_URL}/${id}/${url}`,
					payload,
				),
				new Promise((resolve) => setTimeout(resolve, delay)),
			]);

			if (response.data) updateCharacterInContext(id, response.data);
		} catch (error) {
			setError(error.message);
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
