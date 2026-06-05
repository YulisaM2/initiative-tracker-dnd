import axios from "axios";
import { useRef, useState, useContext } from "react";

import Plus from "../../icons/Plus";
import { CardContext } from "../../context/CardContext";

export const AddButton = () => {
	// Tracking general states
	const [loading, setLoading] = useState(false);
	const [err, setError] = useState(null);
	const startPos = useRef(window.innerHeight * 0.25); // targetting natural viewpoint during creation
	const { setCharacters } = useContext(CardContext);

	const addCharacter = async () => {
		try {
			// Format payload
			const payload = {
				position: {
					x: startPos.current,
					y: startPos.current,
				},
			};

			// Moving slightly to avoid overlap
			startPos.current += 10;
			// Ping db
			const response = await axios.post(
				`${import.meta.env.VITE_API_CHAR_URL}`,
				payload,
			);
			setCharacters((prevState) => [response.data, ...prevState]);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div id='add-btn' className='btn-circle' onClick={addCharacter}>
			<Plus />
		</div>
	);
};
