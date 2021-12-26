const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database/database'); //cambiar la base de datos
const helpers = require('./helpers');

//signin
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true 
}, async (req, username, password, done) => {
    //comprobar el usuario
    const rows = await pool.query('SELECT * FROM USERS WHERE usersUsername = ?', [username]);
    if(rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.usersPassword);
        if (validPassword){
            done(null, user);
        } else {
            done(null, false, req.flash('message','Incorrect password')); //false xq no se puede mostrar
        }
    } else {
        return done(null, false, req.flash('message','User does not exists'));
    }
}));

//signup
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, usersUsername, usersPassword, done) => {
    
    //Se crea el nuevo usuario a insertar en la BD
    const {usersFullname} = req.body;
    const newUser = {
        usersUsername,
        usersPassword,
        usersFullname
    };

    newUser.usersPassword = await helpers.encryptPassword(usersPassword);

    //Se valida que no exista el username
    const queryUsername = await pool.query('SELECT * FROM USERS WHERE usersUsername = ?', [newUser.usersUsername]); 

    //Si está disponible, continúa
    if(queryUsername.length == 0){
        console.log('AVALIABLE'); 

        /*Se inserta el usuario en la BD*/
        const result = await pool.query('INSERT INTO USERS SET ?', [newUser]);
        newUser.usersId = result.insertId; 

        /*Se inserta el rol, siempre será user si se crea desde esta vista*/
        const userRole = {
            userId: result.insertId,
            roleId: 2,
        }; 

        /*Se inserta el rol del usuario en la BD*/
        await pool.query('INSERT INTO usersHasRoles SET ?', [userRole]); 

        return done(null, newUser); 
    }else{

        //Si el nombre escogido no está disponible, manda un req.flash
        return done(null, false, req.flash('message', `ERROR: Username ${newUser.usersUsername} is already taken`));

    }
}));

// ######################
//Signup ADMIN
// ######################
passport.use('local.adminSignup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, usersUsername, usersPassword, done) => {

    //Desde el req.body se reciben dos datos extra, el fullname y el rol
    const {usersFullname, roleId} = req.body;

    const newUser = {
        usersUsername,
        usersPassword,
        usersFullname
    };

    newUser.usersPassword = await helpers.encryptPassword(usersPassword);

    /*Se inserta el usuario en la BD*/
    const result = await pool.query('INSERT INTO USERS SET ?', [newUser]);
    newUser.usersId = result.insertId; 

    /*Se inserta el rol, siempre será user si se crea desde esta vista*/
    const userRole = {
        userId: result.insertId,
        /*Ahora el roleId puede variar, según lo que se ingresó*/
        roleId
    }; 

    /*Se inserta el rol del usuario en la BD*/
    await pool.query('INSERT INTO usersHasRoles SET ?', [userRole]); 

    /*El usuario sigue siendo el mismo de req.user*/
    return done(null, req.user); 
}));

passport.serializeUser((usr, done) => {
    done(null, usr.usersId);
});

passport.deserializeUser(async (usersId, done) => {
    const rows = await pool.query('SELECT * FROM USERS WHERE usersId = ?', [usersId]);
    done(null, rows[0]);
}); 