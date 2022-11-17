const Admin = require('../models/admin');
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign_in', {
        title: 'Sign In'
    })
}

module.exports.createSession = async function(req, res){
    if(req.user.designation){
        return res.redirect('/employee');
    }else{
        return res.redirect('/admin');
    }
}

module.exports.destroySession = async function(req, res){
    req.logout(function(user, err){
        if(err) return next(err);

        return res.redirect('/user/sign-in');
    });
}