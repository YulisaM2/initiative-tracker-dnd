var db = require('../../models')

exports.getChars = function(req, res){
    db.Character.find()
    .then(function(chars){
        res.json(chars);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.createChar = function(req, res){
    db.Character.create({
        genDetails: {
            name: req.body.name
        }
    })
    .then(function(newChar){
        res.status.apply(201).json(newChar);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.getChar = function(req, res){
    db.Character.findById(req.params.charId)
    .then(function(foundChar){
        res.json(foundChar);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.updateCharName = function(req, res){
    db.Character.findOneAndUpdate({
        _id: req.params.charId
    }, {
        genDetails: {
            name: req.body.name
        }
    },
    { 
        new : true // respond with updatedChar
    })
    .then(function(updatedChar){
        res.json(updatedChar);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.deleteChar = function(req,res){
    db.Character.deleteOne({
        _id: req.params.charId
    })
    .then(function(){
        res.json({
            message: "Deleted"
        })
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.deleteAllChars = function(req,res){
    db.Character.deleteMany({})
    .then(function(){
        res.json({
            message: "Db emptied"
        })
    })
    .catch(function(err){
        res.send(err);
    })
};

module.exports = exports;