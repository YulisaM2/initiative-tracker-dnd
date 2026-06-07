var db = require("../../models");

const createCharWithName = (newName) => {
	db.Character.create({
		name: newName,
	});
};
exports.fillDb = async (req, res) => {
	try {
		await Promise.all([
			// Make sure db is populated first

			createCharWithName("Alfie"),
			createCharWithName("Kaia"),
			createCharWithName("Elira"),
			createCharWithName("Naki"),
		]).then(() => {
			res.send("DB filled with seed");
		});
	} catch (err) {
		res.send(err);
	}
};

module.exports = exports;
