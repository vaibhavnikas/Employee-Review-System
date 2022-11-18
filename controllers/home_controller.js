module.exports.home = function(req, res){
    if(req.isAuthenticated()){
        if(req.user.designation){
            return res.redirect('/employee');
        }else{
            return res.redirect('/admin');
        }
    }else{
        return res.redirect('/user/sign-in');
    }
}