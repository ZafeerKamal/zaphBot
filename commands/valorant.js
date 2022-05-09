const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');

var player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
var currentPlayers = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('valorant')
        .setDescription('Valorant 5-Stack'),

    async execute(interaction) {

        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            );

        actionRow = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('join')
                .setLabel('Join!')
                .setStyle('PRIMARY')
        ).addComponents(
            new MessageButton()
                .setCustomId('cancel')
                .setLabel('Cancel 5-Stack')
                .setStyle('DANGER')
        );

        const collector = interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {
            if (currentPlayers == 0) {
                updateAtZero(i);
            } else if (currentPlayers == 1) {
                updateAtOne(i);
            } else if (currentPlayers == 2) {
                updateAtTwo(i)
            } else if (currentPlayers == 3) {
                updateAtThree(i)
            } else if (currentPlayers == 4) {
                updateAtFour(i)
            }

        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`)
        });


        await interaction.reply({ content: 'Only use this command once. Im fragile', embeds: [stackEmbed], components: [actionRow] });
    },
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// 0 Players ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function updateAtZero(i) {
    if (i.customId === 'join') {
        player[0] = i.user;
        actionRow = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('join')
                .setLabel('Join!')
                .setStyle('PRIMARY')
        ).addComponents(
            new MessageButton()
                .setCustomId('leave')
                .setLabel('Leave')
                .setStyle('SECONDARY')
        ).addComponents(
            new MessageButton()
                .setCustomId('cancel')
                .setLabel('Cancel 5-Stack')
                .setStyle('DANGER')
        );

        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            );
        currentPlayers++;
        await i.update({ content: `${i.user} Joined`, embeds: [stackEmbed], components: [actionRow] });
    } else if (i.customId === 'cancel') {
        await i.update({ content: `${i.user.username} Cancelled the 5-stack`, embeds: [], components: [] });
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// 1 Player /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function updateAtOne(i) {
    if (i.customId === 'join') {
        player[1] = i.user;
        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            ); 
        currentPlayers++;
        await i.update({ content: `${i.user} Joined`, embeds: [stackEmbed], components: [actionRow] });
    } else if (i.customId === 'leave') {
        player[0] = '\u200B';
        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            );
            actionRow = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('join')
                    .setLabel('Join!')
                    .setStyle('PRIMARY')
            ).addComponents(
                new MessageButton()
                    .setCustomId('cancel')
                    .setLabel('Cancel 5-Stack')
                    .setStyle('DANGER')
            );
        currentPlayers--;
        await i.update({ content: `${i.user} Left`, embeds: [stackEmbed], components: [actionRow] });
    }
    else if (i.customId === 'cancel') {
        await i.update({ content: `${i.user.username} Cancelled the 5-stack`, embeds: [], components: [] });
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// 2 Players ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function updateAtTwo(i) {
    if (i.customId === 'join') {
        player[2] = i.user;
        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            ); 
        currentPlayers++;
        await i.update({ content: `${i.user} Joined`, embeds: [stackEmbed], components: [actionRow] });
    } else if (i.customId === 'leave') {
        player[1] = '\u200B';
        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            );
        currentPlayers--;
        await i.update({ content: `${i.user} Left`, embeds: [stackEmbed], components: [actionRow] });
    }
    else if (i.customId === 'cancel') {
        await i.update({ content: `${i.user.username} Cancelled the 5-stack`, embeds: [], components: [] });
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// 3 Players ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function updateAtThree(i) {
    if (i.customId === 'join') {
        player[3] = i.user;
        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            ); 
        currentPlayers++;
        await i.update({ content: `${i.user} Joined`, embeds: [stackEmbed], components: [actionRow] });
    } else if (i.customId === 'leave') {
        player[2] = '\u200B';
        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            );
        currentPlayers--;
        await i.update({ content: `${i.user} Left`, embeds: [stackEmbed], components: [actionRow] });
    }
    else if (i.customId === 'cancel') {
        await i.update({ content: `${i.user.username} Cancelled the 5-stack`, embeds: [], components: [] });
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// 4 Players ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function updateAtFour(i) {
    if (i.customId === 'join') {
        player[4] = i.user;
        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            );  
        currentPlayers++;
        await i.update({ content: `${i.user} Joined`, embeds: [stackEmbed], components: [] });
    } else if (i.customId === 'leave') {
        player[3] = '\u200B';
        stackEmbed = new MessageEmbed()
            .setColor('#BF40BF')
            .setTitle('Current Valorant 5-stack:')
            .addFields(
                { name: "Player 1", value: `${player[0]}` },
                { name: "Player 2", value: `${player[1]}` },
                { name: "Player 3", value: `${player[2]}` },
                { name: "Player 4", value: `${player[3]}` },
                { name: "Player 5", value: `${player[4]}` }
            );
        currentPlayers--;
        await i.update({ content: `${i.user} Left`, embeds: [stackEmbed], components: [actionRow] });
    }
    else if (i.customId === 'cancel') {
        await i.update({ content: `${i.user.username} Cancelled the 5-stack`, embeds: [], components: [] });
    }
}


actionRow = new MessageActionRow().addComponents(
    new MessageButton()
        .setCustomId('join')
        .setLabel('Join!')
        .setStyle('PRIMARY')
).addComponents(
    new MessageButton()
        .setCustomId('leave')
        .setLabel('Leave')
        .setStyle('SECONDARY')
).addComponents(
    new MessageButton()
        .setCustomId('cancel')
        .setLabel('Cancel 5-Stack')
        .setStyle('DANGER')
);