const { Events } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: Events.Error,
    execute(clientError) {
        console.log(clientError);
    },
};
