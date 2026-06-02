const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: {
            values: [
                'Aasimar',
                'Dragonborn',
                'Dwarf',
                'Elf',
                'Gnome',
                'Goliath',
                'Hafling',
                'Human',
                'Orc',
                'Tiefling',
                'Homebrew',
                'None'
            ]
        }
    },
});

const Race = mongoose.model('race', raceSchema);
module.exports = { Race, raceSchema };