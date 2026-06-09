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

const updateCharInDb = (id, toUpdate, res) => {
	db.Character.findOneAndUpdate(
		{ _id: id },
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

exports.updateChar = (req, res) => {
	// Extract data to update
	const { name, position, role } = req.body;
	const toUpdate = {};

	if (name) {
		toUpdate["name"] = name;
	}

	if (position) {
		if (position.x !== undefined) toUpdate["position.x"] = position.x;

		if (position.y !== undefined) toUpdate["position.y"] = position.y;
	}

	if (role) toUpdate["role"] = role;

	// Updating
	updateCharInDb(req.params.charId, toUpdate, res);
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

		if (combatHighlights.currHitPoint !== undefined)
			toUpdate["combatHighlights.currHitPoint"] = combatHighlights.currHitPoint;

		if (combatHighlights.tempHitPoint !== undefined)
			toUpdate["combatHighlights.tempHitPoint"] = combatHighlights.tempHitPoint;
	}

	// Updating
	updateCharInDb(req.params.charId, toUpdate, res);
};

exports.updateHasBardicInsp = (req, res) => {
	// Extract data to update
	const { hasBardicInsp } = req.body;
	const toUpdate = {};

	// Checking if boolean is set
	if (hasBardicInsp !== undefined && hasBardicInsp !== null)
		toUpdate["hasBardicInsp"] = hasBardicInsp;

	// Updating
	updateCharInDb(req.params.charId, toUpdate, res);
};

exports.updateHasHeroicInsp = (req, res) => {
	// Extract data to update
	const { hasHeroicInsp } = req.body;
	const toUpdate = {};

	// Checking if boolean is set
	if (hasHeroicInsp !== undefined && hasHeroicInsp !== null)
		toUpdate["hasHeroicInsp"] = hasHeroicInsp;

	// Updating
	updateCharInDb(req.params.charId, toUpdate, res);
};

exports.updateNotes = (req, res) => {
	// Extract data to update
	const { notes } = req.body;
	const toUpdate = {};

	if (notes !== undefined) toUpdate["notes"] = notes;

	// Updating
	updateCharInDb(req.params.charId, toUpdate, res);
};

exports.updateMaxHp = (req, res) => {
	// Extract data to update
	const { combatHighlights } = req.body;
	const toUpdate = {};

	// Assuming the current Hp will be the max
	if (combatHighlights.maxHitPoint !== undefined) {
		toUpdate["combatHighlights.maxHitPoint"] = combatHighlights.maxHitPoint;
		toUpdate["combatHighlights.currHitPoint"] = combatHighlights.maxHitPoint;
	}
	// Updating
	updateCharInDb(req.params.charId, toUpdate, res);
};

exports.updateCurrHp = (req, res) => {
	// Extract data to update
	const { combatHighlights } = req.body;
	const toUpdate = {};

	if (combatHighlights.currHitPoint !== undefined)
		toUpdate["combatHighlights.currHitPoint"] = combatHighlights.currHitPoint;

	console.log(toUpdate);

	// Updating
	updateCharInDb(req.params.charId, toUpdate, res);
};

exports.modifyHp = async (req, res) => {
	const { actionType, amount } = req.body;

	// Get data
	const character = await db.Character.findById(req.params.charId);
	if (!character)
		return res.status(404).json({ message: "Character not found!" });

	let currHp = character.combatHighlights.currHitPoint || 0;
	let tempHp = character.combatHighlights.tempHitPoint || 0;
	let maxHp = character.combatHighlights.maxHitPoint || 0;

	// Perform heal or damage
	if (actionType === "heal") {
		// Heal can only heal until maxHp
		currHp = Math.min(currHp + amount, maxHp);
	} else if (actionType == "damage") {
		// Should substract first from tempHp if available
		let remainer = amount;
		if (tempHp > 0) {
			if (remainer >= tempHp) {
				remainer -= tempHp;
				tempHp = 0;
			} else {
				tempHp -= remainer;
				remainer = 0;
			}
		}

		// Substract remained from Hp (Min val of Hp is 0)
		if (remainer > 0) currHp = Math.max(currHp - remainer, 0);
	}

	character.combatHighlights.currHitPoint = currHp;
	character.combatHighlights.tempHitPoint = tempHp;
	await character
		.save()
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
