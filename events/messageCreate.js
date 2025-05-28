const { Events, time } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        const timestamp = new Date().toLocaleString();
        console.log(`[${timestamp}] [${message.author.tag}]: ${message.content}`);

    }
}