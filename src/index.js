const express = require('express');  
const path = require('path'); 
const morgan = require('morgan');
const express_hbs = require('express-handlebars'); 

const app = express();

const database = require('./database/database')

//Middlewares
app.use(morgan('dev')); 
app.use(
    express.urlencoded({
        extended: false,
    })
);

//Settings
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));    //Ruta a las vistas

// --Handlebars
app.engine(
    '.hbs', express_hbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'), 
        extname: '.hbs' 
        /* helpers:  Aún no se requiere*/
})); 
app.set('view engine', '.hbs');
// -- End handlebars

//Static files
app.use(express.static(path.join(__dirname, 'public')));    //Ruta a los archivos estáticos de la aplicación

//Routes
const router = require('./routes/router.js'); 
app.use('/users', router.authentication); 
app.use('/plans', router.plans); 
app.use('/', router.general_routes); 


//Starting the server
app.listen(app.get('port'), ()=> {
    console.log(`Server listening on port ${app.get('port')}`); 
    //console.log(database);
}); 
