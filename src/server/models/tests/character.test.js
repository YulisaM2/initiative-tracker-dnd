const mongoose = require("mongoose");
const dbHandler = require("./db-handler.js");

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

		const validCharacter = new Character({
			name: testName,
		});

		const savedCharacter = await validCharacter.save();

		expect(savedCharacter._id).toBeDefined();
		expect(savedCharacter.combatHighlights).toBeUndefined();
		expect(savedCharacter.hasBardicInsp).toBe(false); // default value
		expect(savedCharacter.hasHeroicInsp).toBe(false); // default value
		expect(savedCharacter.position).toMatchObject(defaultPos);
		expect(savedCharacter.name).toEqual(testName);
	});

	it("should fail if position < 0", async () => {
		const testName = "Alfie";
		const invalidCharacter = new Character({
			name: testName,
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
