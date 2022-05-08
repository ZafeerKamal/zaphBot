module.exports = {
    name: 'messageCreate',
    execute(message) {
        console.log(`[${message.author.tag}]: ${message.content}`);

        if (message.channel.type === 'news') {
            message.crosspost().catch(console.error);
        }
    }
}