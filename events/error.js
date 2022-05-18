const config = require('../config.json');

module.exports = {
    name: 'error',
    execute(clientError) {
        console.log(clientError);
    },
};
