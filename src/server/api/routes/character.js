const express = require('express');
const router = express.Router();
var db = require('../../models');

const helpers = require('../helpers/character');

router.route('/')
    .get(helpers.getChars)
    .post(helpers.createChar)
    .delete(helpers.deleteAllChars);

router.route('/:charId')
    .get(helpers.getChar)
    .put(helpers.updateCharName)
    .delete(helpers.deleteChar);

module.exports = router;