const mongoose = require('mongoose');

const { raceSchema } = require('./race.js');
const { charClassSchema } = require('./char-class.js');

const genDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: charClassSchema
    },
    race: {
        type: raceSchema
    }
});

const GenDetails = mongoose.model('genDetails', genDetailsSchema);
module.exports = { GenDetails, genDetailsSchema };