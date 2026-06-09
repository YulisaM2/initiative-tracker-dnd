const mongoose = require("mongoose");

const combatHighlightsSchema = new mongoose.Schema({
	armorClass: {
		type: Number,
		min: 0,
	},
	currHitPoint: {
		type: Number,
		min: 0,
		validate: {
			// should not exceed maxHitPoints
			validator: async function (value) {
				// When attempting to manage a document
				if (this.constructor.name === "Query") {
					// Get the document to be updated
					const currentDoc = await this.model.findOne(this.getQuery());

					// Get data
					const maxHp =
						currentDoc?.combatHighlights?.maxHitPoint ||
						currentDoc?.maxHitPoint;

					if (maxHp !== undefined && maxHp !== null) {
						return value <= maxHp;
					}
					return true;
				}
				// For creating the doc
				const maxHp = this.combatHighlights?.maxHitPoint || this.maxHitPoint;
				if (maxHp !== undefined && maxHp !== null) {
					return value <= maxHp;
				}
				return true;
			},
			message: "Current HP cannot > max HP!",
		},
	},
	maxHitPoint: {
		type: Number,
		min: 0,
	},
	passivePercept: {
		type: Number,
		min: 0,
	},
	tempHitPoint: {
		type: Number,
		min: 0,
	},
});

const CombatHighlights = mongoose.model(
	"CombatHighlights",
	combatHighlightsSchema,
);
module.exports = { CombatHighlights, combatHighlightsSchema };
