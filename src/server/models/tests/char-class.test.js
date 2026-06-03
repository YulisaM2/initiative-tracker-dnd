const mongoose = require("mongoose");
const dbHandler = require("./db-handler.js");

const { CharClass } = require("../char-class.js");

// Db Setup
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Character Class Model Unit Tests", () => {
  it("should create a charClass & save succesfully", async () => {
    const testName = "Barbarian";
    const validClass = new CharClass({
      name: testName,
    });

    const savedClass = await validClass.save();

    expect(savedClass._id).toBeDefined();
    expect(savedClass.name).toBe(testName);
  });

  it("should fail if class is not in accepted list", async () => {
    const invalidClass = new CharClass({
      name: "Lumiere",
    });

    let err;
    try {
      await invalidClass.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it("should fail if name is missing", async () => {
    const invalidClass = new CharClass();

    let err;
    try {
      await invalidClass.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
