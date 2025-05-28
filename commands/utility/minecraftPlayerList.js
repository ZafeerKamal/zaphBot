const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Rcon } = require('rcon-client');
const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");
const { awsAccessKeyId, awsSecretAccessKey, awsInstanceId } = require('./../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playerlist')
        .setDescription('Displays the current players on the Minecraft Server'),

    async execute(interaction) {

        const ec2client = new EC2Client({
            region: 'ca-central-1',
            credentials: {
                accessKeyId: awsAccessKeyId,
                secretAccessKey: awsSecretAccessKey
            }
        });

        try {
            const command = new DescribeInstancesCommand({ InstanceIds: [awsInstanceId]});
            const resp = await ec2client.send(command);
            const status = resp.Reservations[0].Instances[0].State.Name;
            console.log(`minecraftPlayerList.js: Status: ${status}`);

            if (status != 'running') {
                let failedEmbed = failedEmbedCreate(status);
                return await interaction.reply({ embeds: [failedEmbed] });
            }

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
            await interaction.reply({ embeds: [msgEmbed] });

            rcon.end();

        } catch (err) {
            console.error('minecraftPlayerList.js: Error getting status:', err);
            console.log('minecraftPlayerList.js: Could not connect to Minecraft Server ');
            let embed2 = NoStatusEmbed();
            await interaction.reply({ embeds: [embed2] });
        }
    },
};

function playerList(players) {
    let embed = new EmbedBuilder()
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

function failedEmbedCreate(status) {
    let embed = new EmbedBuilder()
        .setColor(0x720707)
        .setTitle('Failed to connect to Minecraft Server.')
        .setDescription(`Check if instance is running (/serverstatus). Use /startserver if instance is stopped. Current Instance Status: ${status}`);
    return embed;
}

function NoStatusEmbed() {
    let embed = new EmbedBuilder()
        .setColor(0x720707)
        .setTitle('Failed to connect to Minecraft Server.')
        .setDescription(`Check if instance is running (/serverstatus). Use /startserver if instance is stopped.`);
    return embed;
}