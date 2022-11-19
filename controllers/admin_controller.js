const Admin = require('../models/admin');
const Employee = require('../models/employee');
const Review = require('../models/review');

// function to render admin view
module.exports.home = function(req, res){
    return res.render('admin_view',{
        title: 'Home | Admin'
    });
}

// function to render manage employees page
module.exports.manageEmployees = async function(req, res){

    try{
        const employees = await Employee.find();

        return res.render('manage_employees',{
            title: 'Manage Employees | Admin',
            employees: employees
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// function to render add employee form 
module.exports.displayAddEmployeeForm = function(req, res){
    return res.render('add_employee', {
        title: 'Add Employee | Admin'
    })
}

// function to add employee data to database coming from add employee form 
module.exports.addEmployee = async function(req, res){

    try{
        let employee = await Employee.findOne({
            email: req.body.email
        });
    
        if(!employee){
            employee = await Employee.create(req.body);
            if(employee) req.flash('success', 'Employee added successfully !');
        }else{
            console.log('Employee with the same email already exists');
        }
    
        return res.redirect('/admin/manage-employees');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// function to delete employee from database
module.exports.deleteEmployee = async function(req, res){

    try{
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if(employee) req.flash('success', 'Employee deleted successfully !');

        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// function to render update employee form
module.exports.displayUpdateEmployeeForm = async function(req, res){

    try{
        const employee = await Employee.findById(req.params.id);

        return res.render('edit_employee_details',{
            title: 'Edit Employee Details | Admin',
            employee: employee
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// function to update employee details and save them into database
module.exports.updateEmployeeDetails = async function(req, res){

    try{
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
        if(employee) req.flash('success', 'Employee details updated successfully !');

        return res.redirect('/admin/manage-employees');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    } 
}

// function to render manage review page
module.exports.manageReviews = async function(req, res){

    try{
        const employees = await Employee.find(); 
        const reviews = await Review.find()
        .populate({
            path: 'from_employee to_employee',
        });

        return res.render('manage_reviews',{
            title: 'Manage Reviews | Admin',
            employees: employees,
            reviews: reviews
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// function to assign review
module.exports.assignReview = async function(req, res){

    try{
        let employee1 = await Employee.findById(req.body.from_employee);
        let employee2 = await Employee.findById(req.body.to_employee);

        const review = await Review.findOne({
            from_employee: employee1._id,
            to_employee: employee2._id
        });

        if(!review){
            const review = await Review.create({
                from_employee: employee1._id,
                to_employee: employee2._id,
                status: 'pending',
                rating: 0,
                feedback: '-'
            });
        
            if(employee1){
                employee1.assigned_reviews.push(review);
                employee1.save();
            }
        
            if(employee2){
                employee2.assigned_reviews.push(review);
                employee2.save();
                req.flash('success', 'Review assigned successfully !');
            }
        }else{
            let message = employee1.name + ' has already been assigned the task to review ' + employee2.name;
            req.flash('success', message);
        }

        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// function to render update review form
module.exports.displayUpdateReviewForm = async function(req, res){

    try{
        const review = await Review.findById(req.params.id)
        .populate({
            path: 'from_employee to_employee',
        });

        return res.render('update_review',{
            title: 'Update Review | Admin',
            review: review
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// function to update review and save it to database
module.exports.updateReview = async function(req, res){

    try{
        const review = await Review.findById(req.params.id);

        if(review){
            review.status = 'completed';
            review.rating = req.body.rating;
            review.feedback = req.body.feedback;
            review.save();
            req.flash('success', 'Review updated successfully !');
        }else{
            req.flash('error', "review you are trying to update doesn't exist");
        }

        if(req.user.designation){
            return res.redirect('/employee');
        }else{
            return res.redirect('/admin/manage-reviews');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// function to make employee an admin
module.exports.makeAdmin = async function(req, res){

    try{
        const employee = await Employee.findById(req.params.id);

        let admin = await Admin.findOne({email: employee.email});

        if(!admin){
            admin = await Admin.create({
                name: employee.name,
                email: employee.email,
                password: employee.password
            });
            const message = employee.name + ' is now an admin !';
            if(admin) req.flash('success', message);
        }else{
            const message = employee.name + ' is already an admin !';
            req.flash('error', message);
        }

        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }   
}