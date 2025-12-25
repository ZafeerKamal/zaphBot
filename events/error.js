const { Events } = require('discord.js');

module.exports = {
    name: Events.Error,
    execute(clientError) {
        console.log(clientError);
    },
};
