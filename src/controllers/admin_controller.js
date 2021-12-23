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
        plansData: plans,
    };

    res.render('adminViews/plans', handlebarsObject);
};

controller.addPlan = (req, res) => {
    const handlebarsObject = {
        title: 'Admin :: Create plan',
    };

    res.render('adminViews/createPlan', handlebarsObject);
};

controller.addPlanPost = async (req, res) => {
    //Get data from req.body
    const {
        plansName,
        plansDescription,
        plansCountry,
        plansPrice,
        plansImageUrl,
        plansIncludeHotel,
        plansIncludeFlights,
        plansIncludeActivities,
        plansNumPersons,
        plansDays,
    } = req.body;

    //Create new plan object
    const newObject = {
        plansName,
        plansDescription,
        plansCountry,
        plansPrice,
        plansImageUrl,
        plansIncludeHotel,
        plansIncludeFlights,
        plansIncludeActivities,
        plansNumPersons,
        plansDays,
    };

    //Teniendo el nuevo objeto parseado, se agrega a la BD
    await pool.query('INSERT INTO PLANS SET ?', [newObject]);

    //Una vez inserta el dato, lo redirije a la vista de todos los planes
    res.redirect('/admin/plans');
};

controller.removePlan = async (req, res) => {
    //Se obtiene el id de la ruta
    const { id } = req.params;

    //Intenta eliminar el id dado
    const result = await pool.query('DELETE FROM PLANS WHERE plansId = ?', [id]);

    if (result['affectedRows'] == 0) {
        req.flash('message', `El plan con el id ${id} no existe`); 
        res.redirect('/admin/plans');
    } else {
        //SE manda el flash para indicar que se eliminó correctamente
        req.flash('success', 'El plan se eliminó corectamente');
        res.redirect('/admin/plans');
    }
};

controller.editPlan = async (req, res) => {

    const { id } = req.params; 

    //Se seleccionan los datos actuales del plan desde la BD
    const plan = await pool.query('SELECT * FROM PLANS WHERE plansId = ?', [id]); 

    const handlebarsObject = {
        title: 'Admin :: Edit plan',
        plan: plan[0]
    };

    res.render('adminViews/editPlan', handlebarsObject);
};

controller.updatePlan =  async (req, res) => {

    const { id } = req.params;  
    
    //Get data from req.body
    const {
        plansName,
        plansDescription,
        plansCountry,
        plansPrice,
        plansImageUrl,
        plansIncludeHotel,
        plansIncludeFlights,
        plansIncludeActivities,
        plansNumPersons,
        plansDays,
    } = req.body;

    //Create new plan object
    const updatedPlan = {
        plansName,
        plansDescription,
        plansCountry,
        plansPrice,
        plansImageUrl,
        plansIncludeHotel,
        plansIncludeFlights,
        plansIncludeActivities,
        plansNumPersons,
        plansDays,
    };

    //Update it into DB
    await pool.query('UPDATE PLANS SET ? WHERE plansId = ?', [updatedPlan, id]); 

    req.flash('success', 'El plan fue editado satisfactoriamente'); 
    res.redirect('/admin/plans'); 
};


module.exports = controller;
