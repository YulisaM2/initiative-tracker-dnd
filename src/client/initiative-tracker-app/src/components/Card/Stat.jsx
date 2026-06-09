import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";

import { CardContext } from "../../context/CardContext";
import { MAX_LENGTH_STAT, DELAY_INPUT_FIRE } from "../../assets/constants";
import { cleanNumber, formatToNumber } from "./helpers/Stat.utils";

export const Stat = ({
	id,
	statName,
	label,
	className,
	defaultValue,
	onLoadingChange,
}) => {
	// Tracking general states for query
	const { updateCharacterInContext } = useContext(CardContext);
	const saveTimer = useRef(null);

	// Transform 0 or empty into - for readability
	const [value, setValue] = useState(formatToNumber(defaultValue));

	useEffect(() => {
		if (defaultValue !== undefined && defaultValue !== null) {
			setValue(formatToNumber(defaultValue));
		}
	}, [defaultValue]); // This dependency array tells React to re-run whenever defaultV

	// Controlling how often to query db (avoid spamming)
	// Timmer will trigger when component unmounts (updates)
	// Cleanup here to restart evaluation
	useEffect(() => {
		return () => {
			if (saveTimer.current) clearTimeout(saveTimer.current);
		};
	}, []);

	const updateStat = async (e) => {
		const cleanedNum = cleanNumber(e.target.value, value, MAX_LENGTH_STAT);

		if (cleanedNum === null) return;

		setValue(cleanedNum);

		if (onLoadingChange) onLoadingChange(true);
		if (saveTimer) clearTimeout(saveTimer.current);

		// Delay before firing stat update
		saveTimer.current = setTimeout(async () => {
			try {
				// Format payload
				const payload = {
					combatHighlights: {
						[statName]: cleanedNum,
					},
				};

				// Ping db
				const response = await axios.patch(
					`${import.meta.env.VITE_API_CHAR_URL}/${id}/${import.meta.env.VITE_API_COMBAT_HIGHLIGHTS_URL}`,
					payload,
				);

				if (response.data) updateCharacterInContext(id, response.data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				if (onLoadingChange) onLoadingChange(false);
			}
		}, DELAY_INPUT_FIRE);
	};

	return (
		<div className='stat-container'>
			<div className='stat-label'>{label}</div>
			<input
				className={`stat ${className || ""}`}
				type='text'
				inputMode='numeric'
				pattern='[0-9]*'
				placeholder='-'
				value={value}
				onChange={updateStat}
			/>
		</div>
	);
};
