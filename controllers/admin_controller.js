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
    await Employee.create(req.body);

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

    return res.render('manage_reviews',{
        title: 'Manage Reviews | Admin',
        employees: employees
    });
}

module.exports.assignReview = async function(req, res){
    let employee1 = await Employee.findById(req.body.from_employee);
    let employee2 = await Employee.findById(req.body.to_employee);

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

    return res.redirect('back');
}