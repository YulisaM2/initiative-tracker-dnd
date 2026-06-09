import { useState } from "react";

import { Stat } from "../Stat";

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
	return (
		<div className='stat-container max-hp-display-mode'>
			<div className='hp-mod-controls'>
				<Stat
					id={id}
					label='HP'
					className={className}
					defaultValue={currHpValue}
					statName='currHitPoint'
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
					onChange={(e) => setModifierAmount(e.target.value.replace(/\D/g, ""))}
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
