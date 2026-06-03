const express = require('express');
const router = express.Router();
var db = require('../view-models');

const controller = require('../controllers/cards');

router.route('/')
    .get(controller.getCards)
    .post(controller.createCard);

router.route('/:charId')
    .get(controller.getCard)
    .put(controller.updateCardPos)
    .delete(controller.deleteCard);

module.exports = router;