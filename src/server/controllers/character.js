var db = require("../models");

// 2. To avoid malicious NoSQL injections before they reach db
const mongoSanitize = require("express-mongo-sanitize");

const sanitizeInput = (data, options = {}) => {
	if (!data) return data;
	return mongoSanitize.sanitize(data, options);
};

exports.getChars = (req, res) => {
	const cleanQuery = sanitizeInput(req.query);
	db.Character.find(cleanQuery)
		.then((chars) => {
			res.json(chars);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};

exports.createChar = (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const { position } = cleanBody;
	db.Character.create({
		position: position,
	})
		.then((newChar) => {
			res.status(201).json(newChar);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
};

exports.getChar = (req, res) => {
	const cleanParams = sanitizeInput(req.params);
	db.Character.findById(cleanParams.charId)
		.then((foundChar) => {
			res.json(foundChar);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
};

const updateCharInDb = (id, toUpdate, res) => {
	const cleanId = sanitizeInput(id);
	// Using allow dot so that payload can be built as <parent>.<child attribute>
	const cleanUpdatePayload = sanitizeInput(toUpdate, { allowDots: true });
	db.Character.findOneAndUpdate(
		{ _id: cleanId },
		{ $set: cleanUpdatePayload },
		{
			new: true, // respond with updatedChar,
			runValidators: true,
			context: "query",
		},
	)
		.then((updatedChar) => {
			res.json(updatedChar);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
};

exports.updateChar = (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const cleanParams = sanitizeInput(req.params);

	// Extract data to update
	const { name, position, role } = cleanBody;
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
	updateCharInDb(cleanParams.charId, toUpdate, res);
};

exports.updateCombatHigh = (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const cleanParams = sanitizeInput(req.params);

	// Extract data to update
	const { combatHighlights } = cleanBody;
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
	updateCharInDb(cleanParams.charId, toUpdate, res);
};

exports.updateHasBardicInsp = (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const cleanParams = sanitizeInput(req.params);

	// Extract data to update
	const { hasBardicInsp } = cleanBody;
	const toUpdate = {};

	// Checking if boolean is set
	if (hasBardicInsp !== undefined && hasBardicInsp !== null)
		toUpdate["hasBardicInsp"] = hasBardicInsp;

	// Updating
	updateCharInDb(cleanParams.charId, toUpdate, res);
};

exports.updateHasHeroicInsp = (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const cleanParams = sanitizeInput(req.params);

	// Extract data to update
	const { hasHeroicInsp } = cleanBody;
	const toUpdate = {};

	// Checking if boolean is set
	if (hasHeroicInsp !== undefined && hasHeroicInsp !== null)
		toUpdate["hasHeroicInsp"] = hasHeroicInsp;

	// Updating
	updateCharInDb(cleanParams.charId, toUpdate, res);
};

exports.updateNotes = (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const cleanParams = sanitizeInput(req.params);

	// Extract data to update
	const { notes } = cleanBody;
	const toUpdate = {};

	if (notes !== undefined) toUpdate["notes"] = notes;

	// Updating
	updateCharInDb(cleanParams.charId, toUpdate, res);
};

exports.updateMaxHp = (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const cleanParams = sanitizeInput(req.params);

	// Extract data to update
	const { combatHighlights } = cleanBody;
	const toUpdate = {};

	// Assuming the current Hp will be the max
	if (combatHighlights.maxHitPoint !== undefined) {
		toUpdate["combatHighlights.maxHitPoint"] = combatHighlights.maxHitPoint;
		toUpdate["combatHighlights.currHitPoint"] = combatHighlights.maxHitPoint;
	}
	// Updating
	updateCharInDb(cleanParams.charId, toUpdate, res);
};

exports.updateCurrHp = (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const cleanParams = sanitizeInput(req.params);

	// Extract data to update
	const { combatHighlights } = cleanBody;
	const toUpdate = {};

	if (combatHighlights.currHitPoint !== undefined)
		toUpdate["combatHighlights.currHitPoint"] = combatHighlights.currHitPoint;

	// Updating
	updateCharInDb(cleanParams.charId, toUpdate, res);
};

exports.modifyHp = async (req, res) => {
	const cleanBody = sanitizeInput(req.body);
	const cleanParams = sanitizeInput(req.params);

	const { actionType, amount } = cleanBody;

	try {
		// Get data
		const character = await db.Character.findById(cleanParams.charId);
		if (!character)
			return res.status(404).json({ message: "Character not found!" });

		let currHp = character.combatHighlights.currHitPoint || 0;
		let tempHp = character.combatHighlights.tempHitPoint || 0;
		let maxHp = character.combatHighlights.maxHitPoint || 0;

		if (actionType === "heal") {
			currHp = Math.min(currHp + amount, maxHp);
		} else if (actionType == "damage") {
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
			if (remainer > 0) currHp = Math.max(currHp - remainer, 0);
		}

		character.combatHighlights.currHitPoint = currHp;
		character.combatHighlights.tempHitPoint = tempHp;

		const updatedChar = await character.save();
		res.json(updatedChar);
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.deleteChar = (req, res) => {
	const cleanParams = sanitizeInput(req.params);

	db.Character.deleteOne({
		_id: cleanParams.charId,
	})
		.then(() => {
			res.json({
				message: "Deleted",
			});
		})
		.catch((err) => {
			res.status(400).send(err);
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
			res.status(500).send(err);
		});
};

module.exports = exports;
