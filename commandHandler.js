const { prefix, token, steamKey, mostafaSteamId } = require('./config.json');

module.exports = (client, steam, message) => {
    content = message.content;
    content = content.toLowerCase();

    if (content == "//") {
        message.channel.send("List of Commands:\nStatus / Stat / St");
    }

    if (content.startsWith(`${prefix}status`) || content.startsWith(`${prefix}stat`) || content.startsWith(`${prefix}st`)) {
        if (message.content.match(/mos/i)) {
            steam.getPlayerSummaries(mostafaSteamId).then(result => {
                state = result.data.players[mostafaSteamId].state;
                if (state == 0) {
                    message.channel.send("Mostafa is offline");
                } else if (state == 1) {
                    message.channel.send("Mostafa is online");
                } else if (state == 3) {
                    message.channel.send("Mostafa left his computer on. Low chance he is online"); 
                } else {
                    message.channel.send("Mostafa is being gay. I cannot figure out if he's online or offline"); 
                }
            }).catch(console.error);
        } else if (message.content.match(/hash/i)) {
            message.channel.send("Being Different");
        } else if (message.content.match(/wil/i)) {
            message.channel.send("Not getting bitches");
        }
    }
}