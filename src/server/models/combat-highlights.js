const mongoose = require('mongoose');

const combatHighlightsSchema = new mongoose.Schema({
    armorClass: {
        type: Number,
        min: 0
    },
    currHitPoint: {
        type: Number,
        min: 0,
        validate: { // should not exceed maxHitPoints
            validator: (value) => {
                if(this.maxHitPoint != undefined && this.maxHitPoint != null)
                    return value <= this.maxHitPoint;
                return true; // flexibility in case user only wants to keep track of currHP
            },
            message: props => `currHitPoint (${props.value}) should be <= maxHitPoint (${this.maxHitPoint}) !`
        }
    },
    maxHitPoint: {
        type: Number,
        min: 0
    },
    passivePercept: {
        type: Number,
        min: 0
    },
    tempHitPoint: {
        type: Number,
        min: 0
    },
});

const CombatHighlights = mongoose.model('CombatHighlights', combatHighlightsSchema);
module.exports = { CombatHighlights, combatHighlightsSchema };