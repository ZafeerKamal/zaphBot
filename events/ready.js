const config = require('../config.json');
const currentStatusFunction = require('../functions/currentStatusFunction.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('The client is ready!'); 
        var intervalStatus = setInterval(currentStatusFunction.currentStatusFunction, 1000 * 30, client.channels.cache.find(channel => channel.name == "mostafa-status-updates"));
    },
};
