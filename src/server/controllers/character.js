var db = require("../models");

exports.getChars = (req, res) => {
	db.Character.find()
		.then((chars) => {
			res.json(chars);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.createChar = (req, res) => {
	const { position } = req.body;
	db.Character.create({
		position: position,
	})
		.then((newChar) => {
			res.status(201).json(newChar);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.getChar = (req, res) => {
	db.Character.findById(req.params.charId)
		.then((foundChar) => {
			res.json(foundChar);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.updateChar = (req, res) => {
	// Extract data to update
	const { genDetails, position, role } = req.body;
	const toUpdate = {};

	if (genDetails) {
		if (genDetails.name !== undefined)
			toUpdate["genDetails.name"] = genDetails.name;
	}

	if (position) {
		if (position.x !== undefined) toUpdate["position.x"] = position.x;

		if (position.y !== undefined) toUpdate["position.y"] = position.y;
	}

	if (role) toUpdate["role"] = role;

	// Updating
	db.Character.findOneAndUpdate(
		{ _id: req.params.charId },
		{ $set: toUpdate },
		{
			new: true, // respond with updatedChar,
			runValidators: true,
		},
	)
		.then((updatedChar) => {
			res.json(updatedChar);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.updateCombatHigh = (req, res) => {
	// Extract data to update
	const { combatHighlights } = req.body;
	const toUpdate = {};

	if (combatHighlights) {
		if (combatHighlights.armorClass !== undefined)
			toUpdate["combatHighlights.armorClass"] = combatHighlights.armorClass;

		if (combatHighlights.passivePercept !== undefined)
			toUpdate["combatHighlights.passivePercept"] =
				combatHighlights.passivePercept;
	}

	// Updating
	db.Character.findOneAndUpdate(
		{ _id: req.params.charId },
		{ $set: toUpdate },
		{
			new: true, // respond with updatedChar,
			runValidators: true,
		},
	)
		.then((updatedChar) => {
			res.json(updatedChar);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.updateHasBardicInsp = (req, res) => {
	// Extract data to update
	const { hasBardicInsp } = req.body;
	console.log(hasBardicInsp);
	const toUpdate = {};

	// Checking if boolean is set
	if (hasBardicInsp !== undefined && hasBardicInsp !== null)
		toUpdate["hasBardicInsp"] = hasBardicInsp;

	// Updating
	db.Character.findOneAndUpdate(
		{ _id: req.params.charId },
		{ $set: toUpdate },
		{
			new: true, // respond with updatedChar,
			runValidators: true,
		},
	)
		.then((updatedChar) => {
			res.json(updatedChar);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.updateHasHeroicInsp = (req, res) => {
	// Extract data to update
	const { hasHeroicInsp } = req.body;
	console.log(hasHeroicInsp);
	const toUpdate = {};

	// Checking if boolean is set
	if (hasHeroicInsp !== undefined && hasHeroicInsp !== null)
		toUpdate["hasHeroicInsp"] = hasHeroicInsp;

	// Updating
	db.Character.findOneAndUpdate(
		{ _id: req.params.charId },
		{ $set: toUpdate },
		{
			new: true, // respond with updatedChar,
			runValidators: true,
		},
	)
		.then((updatedChar) => {
			res.json(updatedChar);
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.deleteChar = (req, res) => {
	db.Character.deleteOne({
		_id: req.params.charId,
	})
		.then(() => {
			res.json({
				message: "Deleted",
			});
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.deleteAllChars = (req, res) => {
	db.Character.deleteMany({})
		.then(() => {
			res.json({
				message: "Db emptied",
			});
		})
		.catch((err) => {
			res.send(err);
		});
};

module.exports = exports;
