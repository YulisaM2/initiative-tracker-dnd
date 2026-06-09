import { useState } from "react";

import { Stat } from "../Stat";

export const MaxHpDisplay = ({
	id,
	maxHpValue,
	currHpValue,
	tempValue,
	className,
	onEdit,
	handleHpModifier,
}) => {
	const [modifierAmount, setModifierAmount] = useState("");

	const runHpAction = (actionType) => {
		const parsedAmount = Number(modifierAmount);
		if (isNaN(parsedAmount) || parsedAmount <= 0) return;

		handleHpModifier(actionType, parsedAmount);

		// Clean up modifier after use
		setModifierAmount("");
	};
	return (
		<div
			className='stat-container max-hp-display-mode'
			style={{ display: "flex", flexDirection: "column", gap: "8px" }}
		>
			{" "}
			<div className='hp-values-wrapper vertical-stack'>
				<div
					className='stats-container'
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: "4px",
					}}
				>
					<Stat
						id={id}
						label='HP'
						className={className}
						defaultValue={currHpValue}
						statName='currHitPoint'
					/>
					<div
						className='hp-divider-wrapper'
						style={{
							display: "flex",
							alignItems: "center",
							height: "100%",
							alignSelf: "stretch",
							paddingTop: "24px",
							paddingRight: "20px",
							userSelect: "none",
						}}
					>
						<span className='hp-divider'>/</span>

						<span
							className='max-hp-text'
							onClick={onEdit}
							title='Click to edit Max HP'
						>
							{maxHpValue}
						</span>
					</div>

					<Stat
						id={id}
						label='TP'
						className={className}
						defaultValue={tempValue}
						statName='tempHitPoint'
					/>
				</div>
			</div>
			<div
				className='hp-mod-controls'
				style={{
					display: "flex",
					gap: "6px",
					justifyContent: "center",
					alignItems: "center",
					paddingTop: "10px",
				}}
			>
				<button
					type='button'
					onClick={() => runHpAction("damage")}
					style={{
						backgroundColor: "#d32f2f",
						color: "white",
						padding: "2px 8px",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					Damage
				</button>
				<input
					type='text'
					inputMode='numeric'
					pattern='[0-9]*'
					placeholder='0'
					value={modifierAmount}
					onChange={(e) => setModifierAmount(e.target.value.replace(/\D/g, ""))}
					style={{ width: "50px", textAlign: "center" }}
				/>
				<button
					type='button'
					onClick={() => runHpAction("heal")}
					style={{
						backgroundColor: "#2e7d32",
						color: "white",
						padding: "2px 8px",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					Heal
				</button>
			</div>
		</div>
	);
};
