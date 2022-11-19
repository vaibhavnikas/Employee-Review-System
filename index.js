// import express
const express = require('express');
// import environment variables from config folder
const env = require('./config/environment');
// instantiate express and assign it to app variable
const app = express();
// call view-helpers function to load correct css files from rev-manifest into the views
require('./config/view-helpers')(app);

// use port set up in environment variables
const port = process.env.PORT || 8000;
// use cookie parser to parse cookies
const cookieParser = require('cookie-parser');

// import mongoose.connection exported from mongoose.js
const db = require('./config/mongoose');
// use express-session to create and manage express sessions
const session = require('express-session');
// use passport to setup user authentication
const passport = require('passport');
// use passportLocal strategy to authenticate users
const passportLocal = require('./config/passport-local-strategy');
// use connect-mongo to store user session persistently in mongoDB 
const MongoStore = require('connect-mongo');
// use node-sass-middleware to compile scss to css
const sassMiddleware = require('node-sass-middleware');
// use connect-flash to display flash notifications
const flash = require('connect-flash');
// custom middleware for sending flash messages from request to response
const customMiddleware = require('./config/middleware');
const path = require('path');
// using sassMiddleware function
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));

// use express-ejs-layouts to setup layout for the app
const expressLayouts = require('express-ejs-layouts');
// use express.urlencoded() function to parse form data 
app.use(express.urlencoded());

// use cookieParser as middleware
app.use(cookieParser());

// use expressLayouts as middleware
app.use(expressLayouts);

// setup path for static files such as .css and .js files
app.use(express.static(env.asset_path));

// used to extract styles and scripts into the main layout from partials
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// set view engine as ejs
app.set('view engine', 'ejs');
// used to render views from views folder
app.set('views', './views');

// use express-session as middleware
app.use(session({
    name : 'employee-review-system',
    secret : env.session_cookie_key,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : MongoStore.create(
        {
            mongoUrl: db._connectionString,
            mongoOptions: {
                family: 4
            },
            mongooseConnection: db,
            autoRemove: 'disabled',
            touchAfter: 24 * 3600
        }, 
        function(err){
            console.log(err || 'connect mongo-db setup ok')
        }
    )
}));

// initializing passport and passport session for user authentication
app.use(passport.initialize());
app.use(passport.session());

// set authenticated user using passport.setAuthenticatedUser middleware
app.use(passport.setAuthenticatedUser);

// use connect-flash as middleware
app.use(flash());
app.use(customMiddleware.setFlash);

// use express router as a middleware
app.use('/', require('./routes/index'));

// start listening to requests on the defined port
app.listen(port, function(err){
    if(err){
        console.log('Error in starting the server :', err);
        return;
    }

    console.log(`Server is up and running on port : ${port}`);
})