function createCharacterContract(z, subContract) {
	return z
		.object({
			// Getting the nested attributes
			combatHighlights: subContract.optional(),

			hasBardicInsp: z.boolean().default(false).optional(),
			hasHeroicInsp: z.boolean().default(false).optional(),

			name: z.string().optional(),

			position: z
				.object({
					x: z.number().min(0).default(0),
					y: z.number().min(0).default(0),
				})
				.optional(),

			role: z.enum(["Player", "NPC"]).default("NPC").optional(),

			notes: z.string().optional(),
		})
		.strict();
}

if (typeof module !== "undefined" && module.exports) {
	const { z } = require("zod");
	const { CombatHighlightsContract } = require("./combat-highlights.contract");

	module.exports = {
		CharacterContract: createCharacterContract(z, CombatHighlightsContract),
	};
} else {
	// For React/Vite to be able to import
	globalThis.createCharacterContract = createCharacterContract;
}
