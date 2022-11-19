const express = require('express');
const env = require('./config/environment');
const app = express();
require('./config/view-helpers')(app);

const port = 8000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const path = require('path');

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));

const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

app.use(express.static(env.asset_path));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

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

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in starting the server :', err);
        return;
    }

    console.log(`Server is up and running on port : ${port}`);
})