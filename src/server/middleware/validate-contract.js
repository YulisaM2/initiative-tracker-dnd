// Check that payload can build model based on schema
const validateBody = (schema) => (req, res, next) => {
	const targetData =
		req.body.combatHighlights !== undefined
			? req.body.combatHighlights
			: req.body;

	const result = schema.safeParse(targetData);

	if (!result.success) {
		return res.status(400).json({
			message: "Validation failed",
			// For readability
			errors: result.error.flatten().fieldErrors,
		});
	}

	next();
};

module.exports = { validateBody };
