const Employee = require('../models/employee');

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