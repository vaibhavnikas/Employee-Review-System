const Admin = require('../models/admin');
const Employee = require('../models/employee');

module.exports.signIn = function(req, res){
    try{
        if(req.isAuthenticated()){
            return res.redirect('back');
        }

        return res.render('sign_in', {
            title: 'Sign In'
        })
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.createSession = async function(req, res){

    try{
        req.flash('success', 'Logged In Successfully');
        if(req.user.designation){
            return res.redirect('/employee');
        }else{
            return res.redirect('/admin');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroySession = async function(req, res){

    try{
        req.logout(function(user, err){
            if(err) return next(err);

            req.flash('success', 'You have been logged out');
            return res.redirect('/user/sign-in');
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    } 
}

module.exports.displayRegistrationForm = function(req, res){

    try{
        if(req.isAuthenticated()){
            return res.redirect('back');
        }

        return res.render('employee_register',{
            title: 'Register'
        });
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.register = async function(req, res){

    try{
        await Employee.create(req.body);

        return res.redirect('/user/sign-in');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}