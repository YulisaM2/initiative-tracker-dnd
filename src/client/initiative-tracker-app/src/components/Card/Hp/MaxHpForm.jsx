import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { CardContext } from "../../../context/CardContext";

export const MaxHpForm = ({
	id,
	className,
	defaultValue,
	onLoadingChange,
	onSaveSuccess,
}) => {
	const { updateCharacterInContext } = useContext(CardContext);
	const [err, setError] = useState(null);

	const formatInitialValue = (val) =>
		val === 0 || val === undefined || val === null ? "" : String(val);

	const [value, setValue] = useState(formatInitialValue(defaultValue));
	const [enableMaxHp, setMaxHp] = useState(false);
	const maxLength = 3;

	useEffect(() => {
		setValue(formatInitialValue(defaultValue));
	}, [defaultValue]);

	const handleInputChange = (e) => {
		let cleanValue = e.target.value.replace(/\D/g, "");
		if (cleanValue) cleanValue = String(parseInt(cleanValue, 10));
		if (cleanValue.length > maxLength)
			cleanValue = cleanValue.slice(0, maxLength);
		setValue(cleanValue);
	};

	const handleMaxHpSubmit = async (e) => {
		e.preventDefault();
		const cleanNumericValue = value === "" ? 0 : Number(value);

		if (onLoadingChange) onLoadingChange(true);
		setError(null);

		try {
			const payload = { combatHighlights: { maxHitPoint: cleanNumericValue } };

			console.log(payload);
			const response = await axios.patch(
				`${import.meta.env.VITE_API_CHAR_URL}/${id}/${import.meta.env.VITE_API_MAX_HP_URL}`,
				payload,
			);

			if (response.data) {
				updateCharacterInContext(id, response.data);
				if (onSaveSuccess) onSaveSuccess();
			}
		} catch (error) {
			setError(error.message);
		} finally {
			if (onLoadingChange) onLoadingChange(false);
		}
	};

	if (!enableMaxHp) {
		return (
			<div className='stat-container'>
				<div className='stat-label'>Max HP</div>
				<button
					className={`max-hp-bttn stat ${className || ""}`}
					onClick={() => setMaxHp(true)}
				>
					Set
				</button>
			</div>
		);
	}

	return (
		<div className='stat-container'>
			<div className='stat-label'>Max HP</div>
			<form onSubmit={handleMaxHpSubmit}>
				<input
					className={`stat ${className || ""}`}
					type='text'
					inputMode='numeric'
					pattern='[0-9]*'
					placeholder='-'
					value={value}
					onChange={handleInputChange}
				/>
				<div className='form-actions'>
					<button type='submit' className='confirm-bttn'>
						Confirm
					</button>
					<button
						type='button'
						className='cancel-bttn'
						onClick={() => setMaxHp(false)}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};
