const mongoose = require("mongoose");

const bonusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: {
      values: ["Heroic Inspiration", "Bardic Inspiration", "Homebrew"],
    },
  },
});

const Bonus = mongoose.model("bonus", bonusSchema);
module.exports = { Bonus, bonusSchema };
