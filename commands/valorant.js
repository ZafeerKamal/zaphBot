const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');

var player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
var currentPlayers = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('valorant')
        .setDescription('Valorant 5-Stack V0.5'),

    async execute(interaction) {

        embed = refreshEmbed();
        btn = refreshButtonsZeroPlayers();

        const collector = interaction.channel.createMessageComponentCollector();

        collector.on('collect', async collectedInteraction => {
            if (collectedInteraction.customId === 'join') {
                playerJoined(collectedInteraction, collector)
            } else if (collectedInteraction.customId === 'cancel') {
                playerCancelled(collectedInteraction, collector)
            } else if (collectedInteraction.customId === 'leave') {
                playerLeft(collectedInteraction);
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`)
        });

        await interaction.reply({ content: '@zapphire if this command breaks to help fix the bugs!', embeds: [embed], components: [btn] })
            .catch(console.error);
    },
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function playerJoined(interaction, collector) {
    for (let i = 0; i < 4; i++) {
        if (player[i] == interaction.user) {
            await interaction.reply({ content: "Brother, you're already on the list!", ephemeral: true })
                .then(console.log(`${interaction.user} tried to join twice`))
                .catch(console.error);
            return;
        }
    }
    player[currentPlayers] = interaction.user;
    embed = refreshEmbed();
    if (currentPlayers == 0) {
        buttonsFull = refreshButtonsFull();
    } else if (currentPlayers == 4) {
        fullEmbed = embedFullStack();
        await interaction.update({ content: `Time to shine! ${player[0]}, ${player[1]}, ${player[2]}, ${player[3]}, ${player[4]}`, 
            embeds: [fullEmbed], components: [] })
            .catch(console.error);
        collector.stop();
        currentPlayers = 0;
        player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
        return;
    }
    await interaction.update({ content: `${interaction.user} Joined`, embeds: [embed], components: [buttonsFull] })
        .catch(console.error);
    currentPlayers++;
}

async function playerCancelled(interaction, collector) {
    await interaction.update({ content: `${interaction.user} Cancelled the 5-stack`, embeds: [], components: [] })
        .catch(console.error);
    collector.stop();
    currentPlayers = 0;
    player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
}

async function playerLeft(interaction) {
    if (currentPlayers == 1) {
        player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
        currentPlayers--;
        btns = refreshButtonsZeroPlayers();
        embed = refreshEmbed();
        await interaction.update({ content: `${interaction.user} Left`, embeds: [embed], components: [btns] })
            .catch(console.error);
    } else {
        for (let i = 0; i < 4; i++) {
            if (player[i] == interaction.user) {
                player[i] = '\u200B';
                currentPlayers--;
            }
        }
        player.sort();
        btns = refreshButtonsFull();
        embed = refreshEmbed();
        await interaction.update({ content: `${interaction.user} Left`, embeds: [embed], components: [btns] })
            .catch(console.error);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function refreshButtonsFull() {
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
    return actionRow;
}

function refreshButtonsZeroPlayers() {
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
    return actionRow;
}

function refreshEmbed() {
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
    return stackEmbed;
}

function embedFullStack() {
    stackEmbed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('The 5-stack:')
        .addFields(
            { name: "Player 1", value: `${player[0]}` },
            { name: "Player 2", value: `${player[1]}` },
            { name: "Player 3", value: `${player[2]}` },
            { name: "Player 4", value: `${player[3]}` },
            { name: "Player 5", value: `${player[4]}` }
        );
    return stackEmbed;
}