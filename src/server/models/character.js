const mongoose = require("mongoose");

const { combatHighlightsSchema } = require("./combat-highlights.js");
const { genDetailsSchema } = require("./gen-details.js");
const { bonusSchema } = require("./bonus.js");

// Following Monster Manual Stat Block Overview as guide
const characterSchema = new mongoose.Schema({
	bonus: {
		// Consumables that benefit character
		type: [bonusSchema],
	},
	combatHighlights: {
		type: combatHighlightsSchema,
	},
	genDetails: {
		type: genDetailsSchema,
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

const Character = mongoose.model("character", characterSchema);
module.exports = { Character };
