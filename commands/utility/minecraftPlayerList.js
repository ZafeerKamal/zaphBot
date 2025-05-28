const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Rcon } = require('rcon-client');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playerlist')
        .setDescription('Displays the current players on the Minecraft Server'),
    async execute(interaction) {
        
        const rcon = await Rcon.connect({
            host: "3.97.180.236",
            port: 25575,
            password: 'zaphhomesteadworld'
        });

        console.log('minecraftPlayerList.js: Connected to Minecraft Server ');

        let res = await rcon.send('/list');
        const match = res.match(/There are \d+ of a max of \d+ players online: (.*)/);
        let players = [];
        if (match && match[1].trim() !== '') {
            players = match[1].split(', ').map(p => p.trim());
        }
        console.log(`minecraftPlayerList.js: Match: ${res}`);
        console.log(`minecraftPlayerList.js: Players: ${players}`);

        let msgEmbed = playerList(players);
        interaction.reply({
            embeds: [msgEmbed]
        });

        rcon.end();
        
    },
};

function playerList(players) {
    embed = new EmbedBuilder()
    .setColor(0x0099FF)

    if (players.length == 0) {
        embed.setTitle('There are 0 players on the Minecraft Server.');
    } else if (players.length == 1) {
        embed.setTitle(`There is ${players.length} player on the Minecraft Server!`);
        embed.addFields({name: `${players[0]}`, value: ''});
    } else {
        embed.setTitle(`There are ${players.length} players on the Minecraft Server!`);
        for (let i = 0; i < players.length; i++){
            embed.addFields({name: `${players[i]}`, value: ''});
        }
    }

    return embed;
}