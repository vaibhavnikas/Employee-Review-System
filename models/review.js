const mongoose = require('mongoose');

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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;