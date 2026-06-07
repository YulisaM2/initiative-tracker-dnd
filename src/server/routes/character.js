const express = require("express");
const router = express.Router();
var db = require("../models");

const controller = require("../controllers/character");
const dbHelpers = require("../controllers/helpers/dummy-data");

router
	.route("/")
	.get(controller.getChars)
	.post(controller.createChar)
	.delete(controller.deleteAllChars);

router.route("/dummyData").get(dbHelpers.fillDb);

// Updating stats
router.route("/:charId/combat-highlights").patch(controller.updateCombatHigh);
router
	.route("/:charId/bardic-inspiration")
	.patch(controller.updateHasBardicInsp);
router
	.route("/:charId/heroic-inspiration")
	.patch(controller.updateHasHeroicInsp);
router.route("/:charId/notes").patch(controller.updateNotes);

router
	.route("/:charId")
	.get(controller.getChar)
	.patch(controller.updateChar)
	.put(controller.updateChar)
	.delete(controller.deleteChar);

module.exports = router;
