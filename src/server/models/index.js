const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/initiative-api');

mongoose.Promise = Promise;

const { Character } = require('./character.js');
module.exports.Character =  Character;