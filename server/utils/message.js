var moment = require('moment');

var generateMessage = (from, text) => {
    return{
        from,
        text,
        createAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, lat, lon) => {
    return{
        from,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        createAt: moment().valueOf()
    };
};

module.exports = {generateMessage,generateLocationMessage};