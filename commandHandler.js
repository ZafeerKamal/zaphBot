const config = require('./config.json');

module.exports = (client, steam, message) => {
    content = message.content;
    content = content.toLowerCase();

    if (content == config.prefix) {
        message.channel.send("List of Commands:\nStatus / Stat / St");
    }

    if (content.startsWith(`${config.prefix}status`) || content.startsWith(`${config.prefix}stat`) || content.startsWith(`${config.prefix}st`)) {
        if (message.content.match(/mos/i)) {
            steam.getPlayerSummaries(config.mostafaId).then(result => {
                state = result.data.players[config.mostafaId].state;
                if (state == 0) {
                    message.channel.send("Mostafa is offline");
                } else if (state == 1) {
                    message.channel.send("Mostafa is online");
                } else if (state == 3) {
                    message.channel.send("Mostafa left his computer on. Low chance he is online"); 
                } else {
                    message.channel.send("Cannot figure out if he's online or offline. Check logs"); 
                }
            }).catch(console.error);
        } else if (message.content.match(/zaf/i) || message.content.match(/zaph/i)) {
            steam.getPlayerSummaries(config.zafId).then(result => {
                state = result.data.players[config.zafId].state;
                if (state == 0) {
                    message.channel.send("Zaf is offline");
                } else if (state == 1) {
                    message.channel.send("Zaf is online");
                } else if (state == 3) {
                    message.channel.send("Zaf left his computer on. Low chance he is online"); 
                } else {
                    message.channel.send("Cannot figure out if he's online or offline. Check logs"); 
                }
            })
        }
    }
}