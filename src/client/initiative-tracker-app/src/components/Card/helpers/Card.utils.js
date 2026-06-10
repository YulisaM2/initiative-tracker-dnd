// Updating z index so card can be viewed without obstructions
export const bringToFront = (selectedCard) => {
	selectedCard.style.zIndex = 999;
	Array.from(document.getElementsByClassName("card")).forEach((card) => {
		if (card !== selectedCard)
			card.style.zIndex = selectedCard.style.zIndex - 1; // Make sure it's under desired card
	});
};

// Make sure size of card expands as text area grow
export const autoGrow = (textAreaRef, limit) => {
	const { current } = textAreaRef;
	// Limit card growth
	if (current.scrollHeight > limit) return;
	// Reset height first
	current.style.height = "auto";
	// Set the new height
	current.style.height = current.scrollHeight + "px";
};

// Depending of if error is thrown by Zod (contract layer) or Mongo/Mongoose (db layer)
// Need to extract data from the error to display on banner
export const extractApiErrorMessage = (error) => {
	// Providing message error for validators

	let toastMsg = "Validation failed";
	const responseData = error.response?.data;

	if (responseData && responseData.errors) {
		const allErrorsArray = Object.values(responseData.errors);

		// Looking for the first validation error from possible
		// (Better to fix in order than spam banners with errors)
		if (allErrorsArray.length > 0) {
			const firstError = allErrorsArray[0];

			// 1. Handle flat contract errors
			if (typeof firstError === "string") {
				toastMsg = firstError;
			}
			// 2. Handle nested contract errors
			else if (Array.isArray(firstError) && firstError.length > 0) {
				toastMsg = firstError[0];
			}
			// 3. Handle db errors
			else if (firstError && firstError.message) {
				toastMsg = firstError.message;
			}
		}
	}
	// Fallback for standard error message parameters or raw server strings
	else if (responseData && responseData.message) {
		toastMsg = responseData.message;
	}
	// Last resort network connection status string
	else if (error.message) {
		toastMsg = error.message;
	}

	return toastMsg;
};

export const handleContractValidation = (
	contractValidation,
	fieldName,
	onLoadingChange,
	toast,
) => {
	// If validation passed, done
	if (contractValidation.success) return false;

	// Parse the errors into a readable format from Zod (contracts)
	const fieldErrors = contractValidation.error.flatten().fieldErrors;

	// Extract errors from backend (Mongo, Mongoose, etc)
	const clientErrorMessage =
		fieldErrors[fieldName]?.[0] || "Invalid input value";

	toast.error(clientErrorMessage);

	if (onLoadingChange) onLoadingChange(false);
	return true;
};
