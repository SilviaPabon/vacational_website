const pool = require('../database/database');
const controller = {};

controller.index = async(req, res) => {
    const plans = await pool.query('SELECT plansId, plansImageUrl, plansName, plansCountry, plansPrice FROM PLANS');
    res.render('plansNormal', {plans});
    console.log(plans);
};

controller.specificPlan = async (req, res) => {
    const { id } = req.params;

    //Función para obtener los datos del plan y convertir los boleanos en strings
    const obtainAndParseData = async (id) => {
        const data = await pool.query('SELECT * FROM PLANS WHERE plansId = ?', [id]);

        //Si no existe un plan con el id solicitado retorna null
        if (Object.keys(data).length == 0) {
            return null;
        } else {
            //Los booleanos los cambia por un string según el valor que tenga (true/false)
            data[0].plansIncludeHotel = data[0].plansIncludeHotel == 1 ? 'Yes' : 'No';
            data[0].plansIncludeFlights = data[0].plansIncludeFlights == 1 ? 'Yes' : 'No';
            data[0].plansIncludeActivities = data[0].plansIncludeActivities == 1 ? 'Yes' : 'No';
        }

        return data;
    };

    const planData = await obtainAndParseData(id);

    if (planData != null) {
        //Si existe el plan, busca también los comentarios y envía toda la información a Handlebars
        const planComments = await pool.query('SELECT * FROM COMMENTS WHERE plansId = ?', [id]);

        //Objeto que handlebars renderizará
        const handlebarsObject = {
            title: 'Plan Details', //Título de la página
            planData: planData[0], //Objeto que contiene la información del plan
            planComments,
        };

        res.render('planDetails', handlebarsObject);
    } else {
        //SI no existió el plan con el ID solicitado, envía el siguiente string
        res.send(`PLAN WITH ID ${id} DOESN´T EXIST`);
    }
};

module.exports = controller;
