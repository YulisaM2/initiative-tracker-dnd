var db = require('../view-models')

exports.getCards = (req, res) => {
    db.Card.find()
    .then((card) => {
        res.json(card);
    })
    .catch((err) => {
        res.send(err);
    })
};

exports.getCard = (req, res) => {
    db.Card.findById(req.params.cardId)
    .then((foundCard) => {
        res.json(foundCard);
    })
    .catch((err) => {
        res.send(err);
    })
};


exports.createCard = (req, res) => {
    db.Card.create({ })
    .then((newCard) => {
        res.status.apply(201).json(newCard);
    })
    .catch((err) => {
        res.send(err);
    })
};

exports.updateCardPos = (req, res) => {
    db.Character.findOneAndUpdate({
        _id: req.params.cardId
    }, {
        position: {
            name: req.body.position
        }
    },
    { 
        new : true // respond with updatedCard
    })
    .then((updatedCard) => {
        res.json(updatedCard);
    })
    .catch((err) =>{
        res.send(err);
    })
};

exports.deleteCard = (req,res) => {
    db.Card.deleteOne({
        _id: req.params.cardId
    })
    .then(() => {
        res.json({
            message: "Deleted card"
        })
    })
    .catch((err) => {
        res.send(err);
    })
};
