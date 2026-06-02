const mongoose = require('mongoose');

const charClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: {
            values: [
                'Barbarian',
                'Bard',
                'Cleric',
                'Druid',
                'Fighter',
                'Monk',
                'Paladin',
                'Ranger',
                'Rogue',
                'Sorcerer',
                'Warlock',
                'Wizard',
                'Homebrew', 
                'None'
            ]
        }
    },
});

const CharClass = mongoose.model('charClass', charClassSchema);
module.exports = { CharClass, charClassSchema };