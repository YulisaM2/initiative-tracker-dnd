import { useState, useContext } from "react";
import axios from "axios";

import { CardContext } from "../../context/CardContext";
import Note from "../../icons/Bonus/Note";
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

	// To set icon corresponding to theme/value
	const INSP_ICONS = {
		hasBardicInsp: Note,
		hasHeroicInsp: Hero,
	};
	console.log(bonusName);
	const SelectedIcon = INSP_ICONS[bonusName];

	const updateBonus = async (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		if (onLoadingChange) onLoadingChange(true);

		try {
			// Format payload
			const payload = {
				[bonusName]: !defaultValue,
			};

			// Ping db
			const response = await axios.patch(
				`${import.meta.env.VITE_API_CHAR_URL}/${id}/${url}`,
				payload,
			);

			if (response.data) updateCharacterInContext(id, response.data);
		} catch (error) {
			setError(error.message);
		} finally {
			if (onLoadingChange) onLoadingChange(false);
		}
	};

	return (
		<div className='stat-container'>
			<button className={`bonus-bttn ${className || ""}`} onClick={updateBonus}>
				<SelectedIcon />
			</button>
		</div>
	);
};
