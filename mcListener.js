const { Rcon } = require('rcon-client');
const { EmbedBuilder } = require('discord.js');
const { EC2Client, StopInstancesCommand } = require("@aws-sdk/client-ec2");

let checked_players = [];
let afkTime = null; // Time since 0 players on the server

module.exports = {
    async mcListenerStart(discordClient) {
        let channel;
        try {
            channel = await discordClient.channels.fetch(process.env.MINECRAFT_LOG_ID);
        } catch (err) {
            console.error('mcListener.js: Failed to fetch channel', err);
        }

        setInterval(async () => {
            try {
                const rcon = await Rcon.connect({
                    host: process.env.MINECRAFT_IP,
                    port: process.env.MINECRAFT_PORT,
                    password: process.env.MINECRAFT_RCON_PASSWORD
                });

                const res = await rcon.send('/list');
                const match = res.match(/There are \d+ of a max of \d+ players online: (.*)/);
                let players = [];
                if (match && match[1].trim() !== '') {
                    players = match[1].split(', ').map(p => p.trim());
                }

                const newPlayers = players.filter(p => !checked_players.includes(p));
                newPlayers.forEach(player => {
                    msgEmbed = playerJoined(player);
                    channel.send({ embeds: [msgEmbed] });
                });

                const leftPlayers = checked_players.filter(p => !players.includes(p));
                leftPlayers.forEach(player => {
                    msgEmbed = playerLeft(player);
                    channel.send({ embeds: [msgEmbed] });
                });

                checked_players = players;

                rcon.end();

                if (checked_players.length > 0) {
                    afkTime = null;
                }

                if (checked_players.length == 0 && afkTime == null) {
                    afkTime = new Date();
                }

                if (checked_players.length == 0 && afkTime != null) {
                    const now = new Date();
                    const afkMinutes = (now - afkTime) / (1000*60);
                    console.log(`mcListener.js: No players online for ${afkMinutes.toFixed(2)} minutes.`);

                    if (afkMinutes > 30) {
                        console.log(`mcListener.js: Shutting down EC2 instance due to inactivity`);
                        const ec2Client = new EC2Client({
                            region: process.env.AWS_REGION,
                            credentials: {
                                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                            }
                        });
                        await ec2Client.send(new StopInstancesCommand({ InstanceIds: [process.env.AWS_INSTANCE_ID] }));

                        afkEmbed = inactivity();
                        channel.send({ embeds: [afkEmbed] });
                        afkTime = null;
                    }
                }
            } catch (err) {
                console.error('mcListener.js: Error Polling RCON:', err);
                afkTime = null;
            }
        }, 10000);
    }
}

function playerJoined(player) {
    embed = new EmbedBuilder()
    .setColor('77b255')
    .setTitle(`✅ ${player} joined the Minecraft Server!`);

    return embed;
}

function playerLeft(player) {
    embed = new EmbedBuilder()
    .setColor('cf0000')
    .setTitle(`❌ ${player} left the Minecraft Server.`);

    return embed;
}

function inactivity() {
    embed = new EmbedBuilder()
    .setColor('#720707')
    .setTitle('Shutting down instance due to 30 minutes of inactivity');

    return embed;
}