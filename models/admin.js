const mongoose = require('mongoose');

// define adminSchema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    assigned_reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},{
    timestamps: true
});

// create admin model to store admin details in database
const Admin = mongoose.model('Admin', adminSchema);

// exported Admin model to be accessed by other files
module.exports = Admin;