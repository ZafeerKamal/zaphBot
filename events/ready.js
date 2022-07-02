const config = require('../config.json');
const currentStatusFunction = require('../functions/currentStatusFunction.js');
const twitter = require('../functions/twitter');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('The client is ready!'); 
        var intervalStatus = setInterval(currentStatusFunction.currentStatusFunction, 1000 * 30, client.channels.cache.find(channel => channel.name == "mostafa-status-updates"));
        await twitter.twitterFxn(client.channels.cache.find(channel => channel.name == "twitter"));
    },
};
