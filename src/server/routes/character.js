const express = require("express");
const router = express.Router();
var db = require("../models");

const controller = require("../controllers/character");
const dbHelpers = require("../controllers/helpers/dummy-data");
const { validateBody } = require("../middleware/validate-contract");
const {
	CombatHighlightsContract,
} = require("../../contracts/combat-highlights.contract");
const { CharacterContract } = require("../../contracts/character.contract");

// Reference the contracts to validate that payload meets definitation
router
	.route("/")
	.get(controller.getChars)
	.post(validateBody(CharacterContract), controller.createChar)
	.delete(controller.deleteAllChars);

router.route("/dummyData").get(dbHelpers.fillDb);

// Updating stats
router
	.route("/:charId/combat-highlights")
	.patch(validateBody(CombatHighlightsContract), controller.updateCombatHigh);
router
	.route("/:charId/bardic-inspiration")
	.patch(validateBody(CharacterContract), controller.updateHasBardicInsp);
router
	.route("/:charId/heroic-inspiration")
	.patch(validateBody(CharacterContract), controller.updateHasHeroicInsp);
router
	.route("/:charId/notes")
	.patch(validateBody(CharacterContract), controller.updateNotes);
router
	.route("/:charId/maxHp")
	.patch(validateBody(CombatHighlightsContract), controller.updateMaxHp);
router
	.route("/:charId/currHp")
	.patch(validateBody(CombatHighlightsContract), controller.updateCurrHp);
router.route("/:charId/modifyHp").patch(controller.modifyHp);

router
	.route("/:charId")
	.get(controller.getChar)
	.patch(validateBody(CharacterContract), controller.updateChar)
	.put(validateBody(CharacterContract), controller.updateChar)
	.delete(controller.deleteChar);

module.exports = router;
