import { useRef, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";

import { CardContext } from "../../context/CardContext";
import Trash from "../../icons/Trash";
import { extractApiErrorMessage } from "../Card/helpers/Card.utils";

export const DeleteAllButton = ({ id }) => {
	const { setCharacters } = useContext(CardContext);

	const handleDeleteAll = async () => {
		try {
			const response = await axios.delete(
				`${import.meta.env.VITE_API_CHAR_URL}`,
			);

			// Update the characters list by emptying it
			setCharacters([]);
			toast.success("All characters deleted successfully!");
		} catch (error) {
			const cleanMsg = extractApiErrorMessage(error);
			toast.error(cleanMsg);
		}
	};

	return (
		<div className='btn-circle delete-all-btn' onClick={handleDeleteAll}>
			<Trash />
		</div>
	);
};
