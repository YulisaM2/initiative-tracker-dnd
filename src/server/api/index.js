const path = require('path');
require('dotenv').config({ 
    override: true,
    path: path.resolve(__dirname, '../.env')
 });
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended: true
}));

// Main routes
app.get('/', function(req, res){
    res.send("Home");
});

// Routes
const charRoutes = require('./routes/character.js');
app.use('/api/character', charRoutes);

app.listen(process.env.PORT, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
});