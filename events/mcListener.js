const { Rcon } = require('rcon-client');
const { mcChannelId } = require('./../config.json');

let checked_players = [];

module.exports = {
    async mcListenerStart(discordClient) {

        const channel = await discordClient.channnels.fetch(mcChannelId);

        if (!channel) {
            console.error('Minecraft Listening Channel not found');
            return;
        }

        const rcon = await Rcon.connect({
            host: 'localhost',
            port: 25575,
            password: 'zaphhomesteadworld'
        });
        console.log('Connected to Minecraft Server');

        setInterval(async () => {
            try {
                const res = await rcon.send('list');
                const match = res.match(/There are \d+ of a max \d+ players online: (.*)/);

                let players = [];
                if (match && match[1].trim() !== '') {
                    players = match[1].split(', ').map(p => p.trim());
                }

                const newPlayers = players.filter(p => !previousPlayers.includes(p));
                newPlayers.forEach(player => {
                    channel.send(`**${player}** joined the Minecraft server!`);
                });

                previousPlayers = players;
            } catch (err) {
                console.error('Error Polling RCON:', err);
            }
        }, 10000);

    }
}