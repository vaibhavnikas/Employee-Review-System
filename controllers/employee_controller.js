const Employee = require('../models/employee');
const Review = require('../models/review');

module.exports.displayEmployeeView = async function(req, res){

    try{
        const employee = await Employee.findById(req.user.id)
        .populate({
            path: 'assigned_reviews',
            populate: {
                path: 'from_employee to_employee'
            }
        });

        let reviews = [];

        for(review of employee.assigned_reviews){
            if(review.from_employee.id == req.user.id){
                reviews.push(review);
            }
        }

        return res.render('employee_view',{
            title: 'Home',
            reviews: reviews
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.displayUpdateReviewForm = async function(req, res){

    try{
        const review = await Review.findById(req.params.id)
        .populate({
            path: 'from_employee to_employee',
        });

        return res.render('update_review',{
            title: 'Update Review',
            review: review
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

