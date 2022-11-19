// moongose config to get the app connected with MongoDB
const mongoose = require('mongoose');
const env = require('./environment');

const mongodb_url =  env.mongodb_url || `mongodb://localhost/${env.db}`;

mongoose.connect(mongodb_url, {
    family: 4
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting to MongoDB'));

db.on('open', function(){
    console.log('Connected to database :: MongoDB');
})

module.exports = db;

