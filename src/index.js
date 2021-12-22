const express = require('express');  
const path = require('path'); 
const morgan = require('morgan');
const expressHbs = require('express-handlebars');
const flash = require('connect-flash');

const session = require('express-session');
require('dotenv').config();
const MySQLStore = require('express-mysql-session');
const {database} = require('./database/keys');
const passport = require('passport');

const app = express();
require('./libs/passport');

//Middlewares
app.use(session({
    secret: process.env.SE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev')); 
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

//Settings
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));    //Ruta a las vistas

// --Handlebars
app.engine(
    '.hbs', expressHbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'), 
        extname: '.hbs', 
        helpers: require('./libs/handlebarsHelpers'),
    })
); 
app.set('view engine', '.hbs');
// -- End handlebars

//Static files
app.use(express.static(path.join(__dirname, 'public')));    //Ruta a los archivos estáticos de la aplicación

//global variables for watch messages in other views
app.use((req, res, next) => {
    app.locals.success = req.flash('success'); 
    app.locals.message = req.flash('message');
    //app.locals.user = req.user;
    next();
});

//Routes
const router = require('./routes/router.js'); 
app.use('/users', router.authentication); 
app.use('/plans', router.plans); 
app.use('/', router.generalRoutes); 
app.use('/user', router.user); 


//Starting the server
app.listen(app.get('port'), ()=> {
    console.log(`Server listening on port ${app.get('port')}`);
}); 
