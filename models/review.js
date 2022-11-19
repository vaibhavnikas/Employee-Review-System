const mongoose = require('mongoose');

// define reviewSchema
const reviewSchema = new mongoose.Schema({
    from_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    to_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    status: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

// create review model to store reviews in database
const Review = mongoose.model('Review', reviewSchema);

// exported review model to be accessed by other files
module.exports = Review;