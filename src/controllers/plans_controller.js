const pool = require('../database/database');
const controller = {};

controller.index = (req, res) => {
    res.send('This is the plans route');
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
        /* const planComments = await pool.query('SELECT * FROM COMMENTS WHERE plansId = ?', [id]); */

        const planComments = await pool.query(
            `SELECT COMMENTS.commentsId, COMMENTS.commentsDescription, COMMENTS.commentsDate, USERS.usersFullname
        FROM COMMENTS, USERS
        WHERE (COMMENTS.plansId = ? and COMMENTS.usersId = USERS.usersId)
        `,
            [id]
        );

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

controller.addComment = async (req, res) => {
    //Se obtiene el id del plan desde el que se mandó la petición
    const { id } = req.params;

    //Obtiene los datos del formulario (incluídos los campos hidden)
    const { commentsDescription, plansId, usersId } = req.body;

    //Se crea el nuevo objeto a insertar
    const newComment = {
        commentsDescription,
        plansId,
        usersId,
    };

    //Se inserta en la tabla
    await pool.query('INSERT INTO COMMENTS SET ?', [newComment]);

    //Se envía el mensaje de añadido satisfactoriamente y se redirije de nuevo a la página
    req.flash('success', 'New comment added successfully');
    res.redirect(`/plans/${id}`);
};

controller.removeComment = async (req, res) => {
    //Se obtiene el id del comentario a eliminar
    const commentId = req.params.id;

    //Se selecciona el id del plan que está observando (Para redirigir nuevamente a la vista)
    const actualPlanRESULT = await pool.query('SELECT plansId FROM COMMENTS WHERE commentsId = ?', [commentId]);

    //Se elimina el plan
    await pool.query('DELETE FROM COMMENTS WHERE commentsId = ?', [commentId]);

    req.flash('success', 'Comment was deleted successfully');
    res.redirect(`/plans/${actualPlanRESULT[0]['plansId']}`);
};

module.exports = controller;
