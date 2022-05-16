module.exports = {
    name: 'messageCreate',
    execute(message) {
        console.log(`[${message.author.tag}]: ${message.content}`);

        if (message.channel.type === 'GUILD_NEWS') {
            message.crosspost().catch(console.error);
        }
    }
}