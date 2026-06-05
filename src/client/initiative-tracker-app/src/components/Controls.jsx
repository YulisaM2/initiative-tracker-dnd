import { AddButton } from "./AddButton";
import { Theme } from "./Theme";

import themes from "../assets/themes.json";

const Controls = () => {
	return (
		<div id='controls'>
			<AddButton />
			{themes.map((theme) => (
				<Theme key={theme.id} theme={theme} />
			))}
		</div>
	);
};

export default Controls;
