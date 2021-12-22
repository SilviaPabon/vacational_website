const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database/database'); //cambiar la base de datos
const helpers = require('../libs/helpers');

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
            console.log('loggeado');
            done(null, user, req.flash('success', 'Welcome ' + user.usersUsername));
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
    const {usersFullname} = req.body;
    const newUser = {
        usersUsername,
        usersPassword,
        usersFullname
    };

    newUser.usersPassword = await helpers.encryptPassword(usersPassword);
    const result = await pool.query('INSERT INTO USERS SET ?', [newUser]);
    newUser.usersId = result.insertId; 
    return done(null, newUser); 
}));

passport.serializeUser((usr, done) => {
    done(null, usr.usersId);
});

passport.deserializeUser(async (usersId, done) => {
    const rows = await pool.query('SELECT * FROM USERS WHERE usersId = ?', [usersId]);
    done(null, rows[0]);
}); 
