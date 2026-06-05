import React, { useContext } from "react";
import { AddButton } from "./AddButton";
import GrabActive from "../icons/GrabActive";
import GrabLocked from "../icons/GrabLocked";
import { Theme } from "./Theme";
import { CardContext } from "../context/CardContext.jsx";

import themes from "../assets/themes.json";

const Controls = () => {
	const { enableScreenDrag, setScreenDrag } = useContext(CardContext);

	return (
		<div id='controls'>
			<AddButton />
			{themes.map((theme) => (
				<Theme key={theme.id} theme={theme} />
			))}
			<div
				onClick={() => setScreenDrag(!enableScreenDrag)}
				className={`btn-circle`}
			>
				{enableScreenDrag ? <GrabActive /> : <GrabLocked />}
			</div>
		</div>
	);
};

export default Controls;
