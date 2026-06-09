import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";

import { CardContext } from "../../context/CardContext";
import { MAX_LENGTH_STAT, DELAY_INPUT_FIRE } from "../../assets/constants";

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
	const formatInitialValue = (val) =>
		val === 0 || val === undefined || val === null ? "" : String(val);
	const [value, setValue] = useState(formatInitialValue(defaultValue));

	useEffect(() => {
		setValue(formatInitialValue(defaultValue));
	}, [defaultValue]);

	// Controlling how often to query db (avoid spamming)
	// Timmer will trigger when component unmounts (updates)
	// Cleanup here to restart evaluation
	useEffect(() => {
		return () => {
			if (saveTimer.current) clearTimeout(saveTimer.current);
		};
	}, []);

	const updateStat = async (e) => {
		// Removing characters that aren't digits
		let cleanValue = e.target.value.replace(/\D/g, "");

		// Removing leading 0s
		if (cleanValue) cleanValue = String(parseInt(cleanValue, 10));

		// Keeping value at 2 digits
		if (cleanValue.length > MAX_LENGTH_STAT)
			cleanValue = cleanValue.slice(0, MAX_LENGTH_STAT);

		// Checking that input changed at all
		// Here to avoid triggering loading animation
		if (cleanValue === value) return;

		setValue(cleanValue);

		// Handling emptying of field -> set stat to 0 in db
		cleanValue === "" ? 0 : Number(cleanValue);

		// If empty set 0
		cleanValue = cleanValue === "" ? 0 : Number(cleanValue);

		if (onLoadingChange) onLoadingChange(true);
		if (saveTimer) clearTimeout(saveTimer.current);

		// Delay before firing stat update
		saveTimer.current = setTimeout(async () => {
			try {
				// Format payload
				const payload = {
					combatHighlights: {
						[statName]: cleanValue,
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
