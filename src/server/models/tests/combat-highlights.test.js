const mongoose = require("mongoose");
const dbHandler = require("./db-handler.js");

const { CombatHighlights } = require("../combat-highlights.js");

// Db Setup
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Combat Highlights Model Unit Tests", () => {
  it("should create a combatHighlights & save succesfully", async () => {
    const testAC = 19;
    const testCurrHp = 3;
    const testMaxHP = 10;
    const testPP = 17;
    const testTempHp = 5;

    const validCombHigh = new CombatHighlights({
      armorClass: testAC,
      currHitPoint: testCurrHp,
      maxHitPoint: testMaxHP,
      passivePercept: testPP,
      tempHitPoint: testTempHp,
    });

    const savedCombHigh = await validCombHigh.save();

    expect(savedCombHigh._id).toBeDefined();
    expect(savedCombHigh.maxHitPoint).toBe(testMaxHP);
    expect(savedCombHigh.tempHitPoint).toBe(testTempHp);
    expect(savedCombHigh.currHitPoint).toBe(testCurrHp);
    expect(savedCombHigh.armorClass).toBe(testAC);
    expect(savedCombHigh.passivePercept).toBe(testPP);
  });

  it("should create an empty combatHighlights & save succesfully", async () => {
    const validCombHigh = new CombatHighlights();

    const savedCombHigh = await validCombHigh.save();

    expect(savedCombHigh._id).toBeDefined();
    expect(savedCombHigh.maxHitPoint).toBeUndefined();
    expect(savedCombHigh.tempHitPoint).toBeUndefined();
    expect(savedCombHigh.currHitPoint).toBeUndefined();
    expect(savedCombHigh.armorClass).toBeUndefined();
    expect(savedCombHigh.passivePercept).toBeUndefined();
  });

  it("should create a combatHighlights ONLY WITH CURRHP & save succesfully", async () => {
    const testCurrHp = 10;
    const validCombHigh = new CombatHighlights({
      currHitPoint: testCurrHp,
    });

    const savedCombHigh = await validCombHigh.save();

    expect(savedCombHigh._id).toBeDefined();
    expect(savedCombHigh.currHitPoint).toBe(testCurrHp);
    expect(savedCombHigh.maxHitPoint).toBeUndefined();
    expect(savedCombHigh.tempHitPoint).toBeUndefined();
    expect(savedCombHigh.armorClass).toBeUndefined();
    expect(savedCombHigh.passivePercept).toBeUndefined();
  });

  it("should fail if currHP > maxHP is missing", async () => {
    const invalidCombHigh = new CombatHighlights({
      maxHitPoint: 10,
      currHitPoint: 11,
    });

    let err;
    try {
      await invalidCombHigh.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
