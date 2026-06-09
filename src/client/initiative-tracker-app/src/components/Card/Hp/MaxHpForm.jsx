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
	const delay = 300;

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

			const [response] = await Promise.all([
				axios.patch(
					`${import.meta.env.VITE_API_CHAR_URL}/${id}/${import.meta.env.VITE_API_MAX_HP_URL}`,
					payload,
				),
				new Promise((resolve) => setTimeout(resolve, delay)),
			]);

			if (response.data) {
				updateCharacterInContext(id, response.data);
				setMaxHp(false);
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
					className={`set-max-hp-bttn stat ${className || ""}`}
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
				<div className='form-actions'>
					<button
						type='button'
						className='cancel-bttn'
						onClick={() => setMaxHp(false)}
					>
						Cancel
					</button>
					<input
						className={`stat ${className || ""}`}
						type='text'
						inputMode='numeric'
						pattern='[0-9]*'
						placeholder='-'
						value={value}
						onChange={handleInputChange}
					/>
					<button type='submit' className='confirm-bttn'>
						Confirm
					</button>
				</div>
			</form>
		</div>
	);
};
