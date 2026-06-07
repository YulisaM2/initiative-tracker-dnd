import { useState, useContext } from "react";
import axios from "axios";

import { CardContext } from "../../context/CardContext";

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

	const updateBonus = async (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		if (onLoadingChange) onLoadingChange(true);

		// Delay before firing stat update
		try {
			console.log("UPDATE");

			// Format payload
			const payload = {
				[bonusName]: !defaultValue,
			};

			console.log(payload);
			console.log(`${import.meta.env.VITE_API_CHAR_URL}/${id}/${url}`);

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
			<button
				className={`bonus-bttn ${className || ""}`}
				onClick={updateBonus}
			></button>
		</div>
	);
};
