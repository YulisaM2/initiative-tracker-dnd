import React, { useContext } from "react";
import { AddButton } from "./AddButton.jsx";
import GrabActive from "../../icons/GrabActive.jsx";
import GrabLocked from "../../icons/GrabLocked.jsx";
import { Theme } from "../Theme.jsx";
import { CardContext } from "../../context/CardContext.jsx";

import themes from "../../assets/themes.json";

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
