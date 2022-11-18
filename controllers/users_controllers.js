const Admin = require('../models/admin');
const Employee = require('../models/employee');

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign_in', {
        title: 'Sign In'
    })
}

module.exports.createSession = async function(req, res){
    req.flash('success', 'Logged In Successfully');
    if(req.user.designation){
        return res.redirect('/employee');
    }else{
        return res.redirect('/admin');
    }
}

module.exports.destroySession = async function(req, res){
    req.logout(function(user, err){
        if(err) return next(err);

        req.flash('success', 'You have been logged out');
        return res.redirect('/user/sign-in');
    });
}

module.exports.displayRegistrationForm = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('employee_register',{
        title: 'Register'
    });
}

module.exports.register = async function(req, res){
    await Employee.create(req.body);

    return res.redirect('/user/sign-in');
}