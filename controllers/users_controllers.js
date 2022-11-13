const Admin = require('../models/admin');
module.exports.signIn = function(req, res){

    return res.render('sign_in', {
        title: 'Sign In'
    })
}

module.exports.createSession = async function(req, res){
    return res.redirect('back');
}