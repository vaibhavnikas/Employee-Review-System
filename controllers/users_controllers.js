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
    return res.redirect('/');
}