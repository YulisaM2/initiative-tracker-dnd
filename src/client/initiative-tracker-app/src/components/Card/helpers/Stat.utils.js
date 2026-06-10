import { useEffect, useState } from "react";

export const formatToNumber = (val) => {
	return val === undefined || val === null ? 0 : String(val);
};

export const cleanNumber = (inputValue, currentValue, maxLength) => {
	// Removing characters that aren't digits
	let cleanValue = inputValue.replace(/\D/g, "");

	// Removing leading 0s
	if (cleanValue) {
		cleanValue = String(parseInt(cleanValue, 10));
	}

	// Keeping value at maximum allowed digits
	if (cleanValue.length > maxLength) {
		cleanValue = cleanValue.slice(0, maxLength);
	}

	// Convert empty string to 0, otherwise convert to number
	const res = cleanValue === "" ? 0 : Number(cleanValue);

	// Check if there were any updates
	if (res === Number(currentValue)) {
		return null;
	}

	return res;
};
