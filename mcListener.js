const { Rcon } = require('rcon-client');
const { rcfMcChannelId, zaphMcChannelId } = require('./config.json');
const { EmbedBuilder, embedLength } = require('discord.js');

let checked_players = [];

module.exports = {
    async mcListenerStart(discordClient) {

        let channel;
        
        try {
            channel = await discordClient.channels.fetch(rcfMcChannelId);
        } catch (err) {
            console.error('Failed to fetch channel', err);
        }

        const rcon = await Rcon.connect({
            host: 'localhost',
            port: 25575,
            password: 'zaphhomesteadworld'
        });

        console.log('Connected to Minecraft Server');

        setInterval(async () => {
            try {
                const res = await rcon.send('/list');
                const match = res.match(/There are \d+ of a max of \d+ players online: (.*)/);
                let players = [];
                if (match && match[1].trim() !== '') {
                    players = match[1].split(', ').map(p => p.trim());
                }

                const newPlayers = players.filter(p => !checked_players.includes(p));
                newPlayers.forEach(player => {
                    msgEmbed = playerJoined(player);
                    channel.send({
                        embeds: [msgEmbed]
                    });
                });

                const leftPlayers = checked_players.filter(p => !players.includes(p));
                leftPlayers.forEach(player => {
                    msgEmbed = playerLeft(player);
                    channel.send({
                        embeds: [msgEmbed]
                    });
                });

                checked_players = players;
            } catch (err) {
                console.error('Error Polling RCON:', err);
            }
        }, 10000);

    }
}

function playerJoined(player) {
    embed = new EmbedBuilder()
    .setColor('77b255')
    .setTitle(`✅ ${player} joined the Minecraft Server!`);

    return embed
}

function playerLeft(player) {
    embed = new EmbedBuilder()
    .setColor('cf0000')
    .setTitle(`❌ ${player} left the Minecraft Server.`);

    return embed
}