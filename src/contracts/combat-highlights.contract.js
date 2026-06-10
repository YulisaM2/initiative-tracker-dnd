function createCombatHighlightsContract(z) {
	return z
		.object({
			armorClass: z.number().min(0).optional(),
			passivePercept: z.number().min(0).optional(),
			tempHitPoint: z.number().min(0).optional(),
			maxHitPoint: z.number().min(0).optional(),
			currHitPoint: z.number().min(0).optional(),
		})
		.strict()
		.refine(
			(data) => {
				if (data.currHitPoint !== undefined && data.maxHitPoint !== undefined) {
					return data.currHitPoint <= data.maxHitPoint;
				}
				return true;
			},
			{
				message: "Current HP cannot > max HP!",
				path: ["currHitPoint"],
			},
		);
}

if (typeof module !== "undefined" && module.exports) {
	const { z } = require("zod");
	module.exports = {
		CombatHighlightsContract: createCombatHighlightsContract(z),
	};
} else {
	// For React/Vite to be able to import
	globalThis.createCombatHighlightsContract = createCombatHighlightsContract;
}
