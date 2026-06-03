const mongoose = require("mongoose");

const conditionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: {
      values: [
        "Blinded",
        "Charmed",
        "Deafend",
        "Exhaustion",
        "Frightened",
        "Grappled",
        "Incapacitated",
        "Invisible",
        "Paralyzed",
        "Petrified",
        "Poisoned",
        "Prone",
        "Restrained",
        "Stunned",
        "Unconscious",
        "Homebrew",
      ],
    },
  },
});

const Condition = mongoose.model("condition", conditionSchema);
module.exports = { Condition, conditionSchema };
