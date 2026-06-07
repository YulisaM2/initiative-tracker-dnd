const mongoose = require("mongoose");

const genDetailsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const GenDetails = mongoose.model("genDetails", genDetailsSchema);
module.exports = { GenDetails, genDetailsSchema };
