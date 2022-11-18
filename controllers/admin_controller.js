const Admin = require('../models/admin');
const Employee = require('../models/employee');
const Review = require('../models/review');

module.exports.home = function(req, res){
    return res.render('admin_view',{
        title: 'Home | Admin'
    });
}

module.exports.manageEmployees = async function(req, res){

    const employees = await Employee.find();

    return res.render('manage_employees',{
        title: 'Manage Employees | Admin',
        employees: employees
    })
}

module.exports.displayAddEmployeeForm = function(req, res){
    return res.render('add_employee', {
        title: 'Add Employee | Admin'
    })
}

module.exports.addEmployee = async function(req, res){
    const employee = await Employee.findOne({
        email: req.body.email
    });

    if(!employee){
        await Employee.create(req.body);
    }else{
        console.log('Employee with the same email already exists');
    }

    return res.redirect('/admin/manage-employees');
}

module.exports.deleteEmployee = async function(req, res){
    await Employee.findByIdAndDelete(req.params.id);

    return res.redirect('back');
}

module.exports.displayUpdateEmployeeForm = async function(req, res){
    const employee = await Employee.findById(req.params.id);

    return res.render('edit_employee_details',{
        title: 'Edit Employee Details | Admin',
        employee: employee
    });
}

module.exports.updateEmployeeDetails = function(req, res){
    Employee.findByIdAndUpdate(req.params.id, req.body, function(err, employee){
        if(err){
            console.log('error in updating employee details : ', err);
        }else{
            console.log('employee details updated : ', employee);
        }
    });

    return res.redirect('/admin/manage-employees');
}

module.exports.manageReviews = async function(req, res){
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
}

module.exports.assignReview = async function(req, res){
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
        }
    }else{
        console.log(employee1.name, 'has already been assigned the task to review', employee2.name);
    }

    return res.redirect('back');
}

module.exports.displayUpdateReviewForm = async function(req, res){
    
    const review = await Review.findById(req.params.id)
    .populate({
        path: 'from_employee to_employee',
    });

    return res.render('update_review',{
        title: 'Update Review | Admin',
        review: review
    });
}

module.exports.updateReview = async function(req, res){
    const review = await Review.findById(req.params.id);

    if(review){
        review.status = 'completed';
        review.rating = req.body.rating;
        review.feedback = req.body.feedback;
        review.save();
    }else{
        console.log("review you are trying to update doesn't exist");
    }

    if(req.user.designation){
        return res.redirect('/employee');
    }else{
        return res.redirect('/admin/manage-reviews');
    }
}

module.exports.makeAdmin = async function(req, res){
    const employee = await Employee.findById(req.params.id);

    const admin = await Admin.findOne({email: employee.email});

    if(!admin){
        await Admin.create({
            name: employee.name,
            email: employee.email,
            password: employee.password
        });
    }else{
        console.log('Employee is already an admin');
    }

    return res.redirect('back');
}