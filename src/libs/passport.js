const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database/database'); //cambiar la base de datos
const helpers = require('../libs/helpers');

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
