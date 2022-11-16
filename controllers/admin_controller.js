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