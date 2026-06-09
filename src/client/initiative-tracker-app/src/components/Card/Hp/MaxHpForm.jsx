import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

import { CardContext } from "../../../context/CardContext";
import {
	MAX_LENGTH_HP,
	DELAY_SPINNER_TRIGGER,
} from "../../../assets/constants";
import { cleanNumber, formatToNumber } from "../helpers/Stat.utils";

export const MaxHpForm = ({
	id,
	className,
	defaultValue,
	onLoadingChange,
	onSaveSuccess,
}) => {
	const { updateCharacterInContext } = useContext(CardContext);

	const [value, setValue] = useState(formatToNumber(defaultValue));
	const [enableMaxHp, setMaxHp] = useState(false);

	useEffect(() => {
		setValue(formatToNumber(defaultValue));
	}, [defaultValue]);

	const handleInputChange = (e) => {
		const cleanedNum = cleanNumber(e.target.value, value, MAX_LENGTH_HP);

		if (cleanedNum === null) return;

		setValue(cleanedNum);
	};

	const handleMaxHpSubmit = async (e) => {
		e.preventDefault();
		const cleanNumericValue = value === "" ? 0 : Number(value);

		if (onLoadingChange) onLoadingChange(true);

		try {
			const payload = { combatHighlights: { maxHitPoint: cleanNumericValue } };

			const [response] = await Promise.all([
				axios.patch(
					`${import.meta.env.VITE_API_CHAR_URL}/${id}/${import.meta.env.VITE_API_MAX_HP_URL}`,
					payload,
				),
				new Promise((resolve) => setTimeout(resolve, DELAY_SPINNER_TRIGGER)),
			]);

			if (response.data) {
				updateCharacterInContext(id, response.data);
				setMaxHp(false);
				if (onSaveSuccess) onSaveSuccess();
			}
		} catch (error) {
			toast.error(error.message);
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
