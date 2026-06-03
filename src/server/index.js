const path = require('path');
require('dotenv').config({ 
    override: true,
    path: path.resolve(__dirname, '../.env')
 });

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// Middleware
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended: true
}));

// Connecting to db
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGOOSE_DB_URL)
    .then(() => {
        mongoose.Promise = Promise;
        console.log("SUCCESS: Connected to MongoDB on " + process.env.MONGOOSE_DB_URL)

        // Once db is connected, start the server
        app.listen(process.env.PORT, () => {
            console.log("APP IS RUNNING ON PORT " + process.env.PORT);
        });
    })
    .catch(err => console.error("Database connection failed:", err));

// Main routes
app.get('/', (req, res) =>{
    res.send("Home");
});

// Routes
const charRoutes = require('./routes/character');
app.use('/api/character', charRoutes);

const cardRoutes = require('./routes/card');
app.use('/api/card')