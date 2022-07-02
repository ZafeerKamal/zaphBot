const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message) {
        
        if (config.debug) console.log(`[${message.author.tag}]: ${message.content}`);

        if (message.channel.type === 'GUILD_NEWS') {
            message.crosspost().catch(console.error);
        }
    }
}