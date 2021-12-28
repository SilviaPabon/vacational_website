const { format } = require('timeago.js');
const moment = require('moment'); 

const helpers = {};

helpers.timeago = (timestamp) => {
    //Adding french UTC to DB timestamp
    const dbDate = moment(timestamp).utc().utcOffset(-5).format('MM/DD/YYYY, h:mm a'); 

    //Convert french date to local
    // IMPORTANT: Inside .utc() It is necessary to indicate the input format.
    const localDate = moment.utc(dbDate, 'MM/DD/YYYY, h:mm a').local().format('MM/DD/YYYY, h:mm a'); 

    return format(localDate);
};

module.exports = helpers;
