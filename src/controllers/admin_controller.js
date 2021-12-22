const passport = require('passport');
const pool = require('../database/database');

const controller = {};

// ############# DASHBOARD
controller.dashboard = (req, res) => {
    const handlebarsObject = {
        title: 'Admin :: Dashboard',
    };

    res.render('adminViews/dashboard', handlebarsObject);
};

// ############ CREATE ACCOUNT
controller.createAccount = (req, res) => {
    const handlebarsObject = {
        title: 'Admin :: Create Account',
    };

    res.render('auth/signup_admin', handlebarsObject);
};

controller.createAccountPost = passport.authenticate('local.adminSignup', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/createAccount',
    failureFlash: true,
});

// ############ PLANS
controller.plans = async (req, res) => {

    const plans = await pool.query('SELECT * FROM PLANS');

    const handlebarsObject = {
        title: 'Admin :: Plans Management',
        plansData: plans
    };

    res.render('adminViews/plans', handlebarsObject); 
}; 

controller.addPlan = (req, res) => {

    const handlebarsObject = {
        title: 'Admin :: Create plan',
    };

    res.render('adminViews/createPlan', handlebarsObject); 

}; 

controller.addPlanPost = (req, res) => {

}; 



module.exports = controller;
