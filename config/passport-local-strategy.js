const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin');
const Employee = require('../models/employee');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},function(req, email, password, done){
    Admin.findOne({email : email}, function(err,user){
        if(err){
            req.flash('error', 'Error in finding user ---> passport');
            return done(err);
        }

        if(user && user.password==password){
            return done(null,user);
        }else{
            Employee.findOne({email : email}, function(err,user){
                if(err){
                    req.flash('error', 'Error in finding user ---> passport');
                    return done(err);
                }
        
                if(user && user.password==password){
                    return done(null,user);
                }else{
                    req.flash('error', 'Invalid Email/Password');
                    return done(null,false);
                }
            });    
        }
    }); 
}));


passport.serializeUser(function(user, done){
    done(null, user.id);
});


passport.deserializeUser(function(id, done){
    Admin.findById(id, function(err, user){
        if(err){
            console.log('error in finding user ---> passport');
            return done(err);
        }

        if(user){
            return done(null,user);
        }else{
            Employee.findById(id, function(err, user){
                if(err){
                    console.log('error in finding user ---> passport');
                    return done(err);
                }
        
                if(user) return done(null,user);
            });
        }
    });
});


passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/sign-in');
}

passport.checkEmployeeAuthorization = function(req, res, next){
    if(req.user.designation){
        next();
    }else{
        return res.redirect('back');
    }
}

passport.checkAdminAuthorization = function(req, res, next){
    if(!req.user.designation){
        next();
    }else{
        return res.redirect('back');
    }
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        res.locals.user.password = '*********';
    }

    next();
}

module.exports = passport;