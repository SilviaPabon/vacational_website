const controller = {}; 

const pool = require('../database/database');

controller.dashboard = (req, res) => {
    const handlebarsObject = {
        title: 'User :: Dashboard', //Título de la página
    };
    res.render('userViews/dashboard', handlebarsObject);
};
//despliegue de planes del usuario
controller.watchUserPlans = async(req, res) => {
    const plans = await pool.query('SELECT PLANS.plansId, plansName, plansCountry, plansImageUrl, reservationsDate FROM PLANS, RESERVATIONS WHERE PLANS.plansId = RESERVATIONS.plansId and RESERVATIONS.usersId = ?', [req.user.usersId]);
    const handlebarsObject = {
        title: 'User :: My Plans',
        plans: plans //Título de la página
    };
    res.render('userViews/userEditplans', handlebarsObject);
};

//para que el usuario agrege los planes
controller.userAddPlans = async (req, res) => {
    const {plansId} = req.body;
    
    const newReserv = {
        plansId,
        usersId: req.user.usersId
    }; 

    const rows = await pool.query('SELECT * FROM RESERVATIONS WHERE plansId = ? and usersId = ?', [plansId, req.user.usersId]);
    if(rows.length > 0) {
        req.flash('message','You already have this reservation');
        res.redirect('/user/plans');
    } else {
        await pool.query('INSERT INTO RESERVATIONS set ?', [newReserv]);
        res.redirect('/user/plans');
    }
};

controller.userDeletePlans = async(req, res) => {
    const { id } = req.params;

    //Intenta eliminar el id dado
    const result = await pool.query('DELETE FROM RESERVATIONS WHERE plansId = ? and usersId = ?', [id, req.user.usersId]);

    if (result['affectedRows'] == 0) {
        req.flash('message', `You don't have any reservation with ${id} id`); 
        res.redirect('/user/plans');
    } else {
        //SE manda el flash para indicar que se eliminó correctamente
        req.flash('success', 'Reservation deleted succesfully');
        res.redirect('/user/plans');
    }
};

module.exports = controller; 