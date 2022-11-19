const mongoose = require('mongoose');

// define employeeSchema
const employeeSchema = new mongoose.Schema({
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
    department: {
        type: String,
        required: true
    },
    designation: {
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

// create employee model to store employee details in database
const Employee = mongoose.model('Employee', employeeSchema);

// exported employee model to be accessed by other files
module.exports = Employee;