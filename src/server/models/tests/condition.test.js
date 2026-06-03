const mongoose = require("mongoose");
const dbHandler = require("./db-handler.js");

const { Condition } = require("../condition.js");

// Db Setup
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Condition Model Unit Tests", () => {
  it("should create a condition & save succesfully", async () => {
    const testName = "Stunned";
    const validCondition = new Condition({
      name: testName,
    });

    const savedCondition = await validCondition.save();

    expect(savedCondition._id).toBeDefined();
    expect(savedCondition.name).toBe(testName);
  });

  it("should fail if class is not in accepted list", async () => {
    const invalidCondition = new Condition({
      name: "Lumiere",
    });

    let err;
    try {
      await invalidCondition.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it("should fail if name is missing", async () => {
    const invalidCondition = new Condition();

    let err;
    try {
      await invalidCondition.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
