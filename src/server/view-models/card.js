const mongoose = require('mongoose');
const { Schema } = mongoose;

const { characterSchema } = require('../models/character');

// UI element that will show the character's stats
const cardSchema = new mongoose.Schema({
    character : { 
        type: Schema.Types.ObjectId, 
        ref: 'character',
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

// Making sure character is also deleted from db
cardSchema.pre('deleteOne', 
    { 
        document: true,
        query: false
    }, 
    async function(next) {
        // Looking for character to delete
        if(this.character) 
            await mongoose.model('character').deleteOne(
            {
                _id: this.character
            });
});

const Card = mongoose.model('card', cardSchema);
module.exports = { Card };