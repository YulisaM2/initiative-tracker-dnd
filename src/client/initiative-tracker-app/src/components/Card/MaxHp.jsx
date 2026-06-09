import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CardContext } from "../../context/CardContext";

export const MaxHp = ({ id, className, defaulValue, onLoadingChange }) => {
	const { updateCharacterInContext } = useContext(CardContext);
	const [err, setError] = useState(null);

	// Transform 0 or empty into "" for numeric inputs
	const formatInitialValue = (val) =>
		val === 0 || val === undefined || val === null ? "" : String(val);

	const [value, setValue] = useState(formatInitialValue(defaulValue));
	// Controls whether the input form or the "Set" button is visible
	const [enableMaxHp, setMaxHp] = useState(false);

	// Constraints
	const maxLength = 3;

	useEffect(() => {
		setValue(formatInitialValue(defaulValue));
	}, [defaulValue]);

	const handleInputChange = (e) => {
		// Removing characters that aren't digits
		let cleanValue = e.target.value.replace(/\D/g, "");

		// Removing leading 0s
		if (cleanValue) cleanValue = String(parseInt(cleanValue, 10));

		// Keeping value at max length
		if (cleanValue.length > maxLength) {
			cleanValue = cleanValue.slice(0, maxLength);
		}

		setValue(cleanValue);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Convert local state string into a clean number for the DB payload
		const cleanNumericValue = value === "" ? 0 : Number(value);

		if (onLoadingChange) onLoadingChange(true);
		setError(null);

		try {
			const payload = {
				combatHighlights: {
					maxHitPoint: cleanNumericValue,
				},
			};

			console.log(payload);

			// Ping db
			const response = await axios.patch(
				`${import.meta.env.VITE_API_CHAR_URL}/${id}/${import.meta.env.VITE_API_MAX_HP_URL}`,
				payload,
			);

			if (response.data) {
				updateCharacterInContext(id, response.data);
				setMaxHp(false); // Close edit state on successful update
			}
		} catch (error) {
			setError(error.message);
		} finally {
			if (onLoadingChange) onLoadingChange(false);
		}
	};

	const isEmpty = value === "" || value === undefined;

	// Render "Set" button ONLY if value is empty AND the user hasn't clicked it yet
	if (isEmpty && !enableMaxHp) {
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

	// Render input field if there's already data, OR if the user clicked "Set"
	return (
		<div className='stat-container'>
			<div className='stat-label'>Max HP</div>
			<form onSubmit={handleSubmit}>
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
					{enableMaxHp && (
						<button
							type='button'
							className='cancel-bttn'
							onClick={() => setMaxHp(false)}
						>
							Cancel
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
