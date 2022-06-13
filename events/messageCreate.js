const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message) {
        
        if (config.debug) console.log(`[${message.author.tag}]: ${message.content}`);

        if (message.author.bot) {
            return;
        }

        if (message.channel.type === 'GUILD_NEWS') {
            message.crosspost().catch(console.error);
        }
    }
}