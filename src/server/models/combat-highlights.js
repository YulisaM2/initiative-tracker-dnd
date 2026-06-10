const mongoose = require("mongoose");

const combatHighlightsSchema = new mongoose.Schema({
	armorClass: {
		type: Number,
		min: 0,
	},
	currHitPoint: {
		type: Number,
		min: 0,
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
