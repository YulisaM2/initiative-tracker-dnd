const mongoose = require("mongoose");
const dbHandler = require("./db-handler.js");

const { GenDetails } = require("../gen-details.js");
const { Race } = require("../race.js");
const { CharClass } = require("../char-class.js");
const { CombatHighlights } = require("../combat-highlights.js");
const { Character } = require("../character.js");

// Db Setup
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Character Model Unit Tests", () => {
	it("should create a character with NAME ONLY & save succesfully", async () => {
		const defaultPos = {
			x: 0,
			y: 0,
		};
		const testName = "Alfie";
		const testGenDet = new GenDetails({
			name: testName,
		});
		const validCharacter = new Character({
			genDetails: testGenDet,
		});

		const savedCharacter = await validCharacter.save();

		expect(savedCharacter._id).toBeDefined();
		expect(savedCharacter.bonus).toEqual([]);
		expect(savedCharacter.combatHighlights).toBeUndefined();
		expect(savedCharacter.condition).toEqual([]);
		expect(savedCharacter.position).toMatchObject(defaultPos);
		expect(savedCharacter.genDetails.toObject()).toMatchObject(
			testGenDet.toObject(),
		);
	});

	it("should fail if position < 0", async () => {
		const testName = "Alfie";
		const testGenDet = new GenDetails({
			name: testName,
		});
		const invalidCharacter = new Character({
			genDetails: testGenDet,
			position: {
				x: -1,
				y: -2,
			},
		});

		let err;
		try {
			await invalidCharacter.save();
		} catch (error) {
			err = error;
		}

		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
	});
});
