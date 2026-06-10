import { useState } from "react";

import { Stat } from "../Stat";
import { MAX_LENGTH_HP } from "../../../assets/constants";
import { cleanNumber } from "../helpers/Stat.utils";

export const HpDisplay = ({
	id,
	maxHpValue,
	currHpValue,
	tempValue,
	className,
	handleHpModifier,
}) => {
	const [modifierAmount, setModifierAmount] = useState("");

	const runHpAction = (actionType) => {
		const parsedAmount = Number(modifierAmount);
		if (isNaN(parsedAmount) || parsedAmount <= 0) return;

		handleHpModifier(actionType, parsedAmount);

		// Clean up after updating Hps
		setModifierAmount("");
	};

	const handleModifierChange = (e) => {
		const cleanedNum = cleanNumber(
			e.target.value,
			modifierAmount,
			MAX_LENGTH_HP,
		);

		if (cleanedNum === null) return;

		setModifierAmount(cleanedNum === 0 ? "" : cleanedNum);
	};

	return (
		<div className='stat-container max-hp-display-mode'>
			<div className='hp-mod-controls'>
				<Stat
					id={id}
					label='HP'
					className={className}
					defaultValue={currHpValue}
					statName='currHitPoint'
					maxHpValue={maxHpValue}
				/>

				<div className='hp-divider-wrapper'>
					<div className='max-hp-text'>/{maxHpValue}</div>
				</div>

				<Stat
					id={id}
					label='TP'
					className={className}
					defaultValue={tempValue}
					statName='tempHitPoint'
				/>
			</div>

			<div className='hp-mod-controls'>
				<button
					className='damage-bttn'
					type='button'
					onClick={() => runHpAction("damage")}
				>
					-
				</button>
				<input
					type='text'
					inputMode='numeric'
					pattern='[0-9]*'
					placeholder='0'
					value={modifierAmount}
					onChange={handleModifierChange}
				/>
				<button
					className='heal-bttn'
					type='button'
					onClick={() => runHpAction("heal")}
				>
					+
				</button>
			</div>
		</div>
	);
};
