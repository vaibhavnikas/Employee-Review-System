module.exports.home = function(req, res){
    return res.render('admin_view',{
        title: 'Home | Admin'
    });
}

module.exports.manageEmployees = function(req, res){
    return res.render('manage_employees',{
        title: 'Manage Employees | Admin'
    })
}