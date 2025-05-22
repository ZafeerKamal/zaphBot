const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        
        console.log(`[${message.author.tag}]: ${message.content}`);

    }
}