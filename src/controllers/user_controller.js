const controller = {}; 

const pool = require('../database/database');

controller.dashboard = (req, res) => {
    res.render('userViews/dashboard');
};

controller.watchuserplans = async(req, res) => {
    const plans = await pool.query('SELECT plansName, plansCountry, plansImageUrl, reservationsDate FROM PLANS, RESERVATIONS WHERE PLANS.plansId = RESERVATIONS.plansId and RESERVATIONS.usersId = ?', [req.user.usersId]);
    console.log(plans);
    res.render('userViews/userEditplans', {plans});
};


controller.addplans = async (req, res) => {

    const newReserv = {
        plansId,
        usersId: req.user.usersId
    }; //para enlazar el objeto con el usuario
    
    await pool.query('INSERT INTO RESERVATIONS set ?', [newReserv]);
    req.flash('success', 'link saved successfully'); //nombremensaje, valor mensaje
    console.log(newReserv); //me envía a links de nuevo
    res.redirect('/user/plans');
};

module.exports = controller; 