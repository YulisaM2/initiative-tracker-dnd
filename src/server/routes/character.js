const express = require('express');
const router = express.Router();
var db = require('../models');

const controller = require('../controllers/character');
const dbHelpers = require('../controllers/helpers/dummy-data')

router.route('/')
    .get(controller.getChars)
    .post(controller.createChar)
    .delete(controller.deleteAllChars);

router.route('/dummyData')
    .get(dbHelpers.fillDb);

router.route('/:charId')
    .get(controller.getChar)
    .put(controller.updateCharName)
    .delete(controller.deleteChar);

module.exports = router;