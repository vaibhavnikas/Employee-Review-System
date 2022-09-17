const mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost/employee-review-system-development';

mongoose.connect(mongodb_url, {
    family: 4
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting to MongoDB'));

db.on('open', function(){
    console.log('Connected to database :: MongoDB');
})

module.exports = db;

