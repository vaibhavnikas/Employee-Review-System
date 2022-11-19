// passport configuration for user authentication
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin');
const Employee = require('../models/employee');

// authenticating using passport-local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},function(req, email, password, done){
    // login as admin if user's email exists in Admin model
    Admin.findOne({email : email}, function(err,user){
        if(err){
            req.flash('error', 'Error in finding user ---> passport');
            return done(err);
        }

        if(user && user.password==password){
            return done(null,user);
        }else{
            // login as employee if user's email exists in Employee model
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

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
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

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in then pass in the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in redirect the user to sign-in page
    return res.redirect('/user/sign-in');
}

// check employee authorization (admin and employee have different privileges and different views)
// this check prevents employee from accessing admin's views and privileges and vice versa
passport.checkEmployeeAuthorization = function(req, res, next){
    if(req.user.designation){
        next();
    }else{
        return res.redirect('back');
    }
}

// check Admin authorization (admin and employee have different privileges and different views)
// this check prevents admin from accessing employee's views and privileges and vice versa
passport.checkAdminAuthorization = function(req, res, next){
    if(!req.user.designation){
        next();
    }else{
        return res.redirect('back');
    }
}

// set authenticated user to be sent to the views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        res.locals.user.password = '*********';
    }

    next();
}

module.exports = passport;