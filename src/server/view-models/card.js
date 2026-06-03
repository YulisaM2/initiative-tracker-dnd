const mongoose = require('mongoose');

const { characterSchema } = require('../models/character');

// UI element that will show the character's stats
const cardSchema = new mongoose.Schema({
    character : { 
        type: characterSchema,
    },

    position : {
        x: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        y: {
           type: Number,
            required: true,
            min: 0,
            default: 0 
        }
    }
});

const Card = mongoose.model('card', cardSchema);
module.exports = { Card };