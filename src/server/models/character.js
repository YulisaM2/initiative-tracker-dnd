const mongoose = require("mongoose");

const { combatHighlightsSchema } = require("./combat-highlights.js");

// Following Monster Manual Stat Block Overview as guide
const characterSchema = new mongoose.Schema({
	combatHighlights: {
		type: combatHighlightsSchema,
	},
	hasBardicInsp: {
		type: Boolean,
		default: false,
	},
	hasHeroicInsp: {
		type: Boolean,
		default: false,
	},
	name: {
		type: String,
	},
	position: {
		x: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		y: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
	},
	role: {
		type: String,
		enum: {
			values: ["Player", "NPC"],
		},
		default: "NPC",
	},
	notes: {
		type: String,
	},
});

if (mongoose.models && mongoose.models.Character) {
	delete mongoose.models.Character;
}
const Character = mongoose.model("character", characterSchema);
module.exports = { Character };
