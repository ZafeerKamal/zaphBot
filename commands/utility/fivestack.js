const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fivestack')
        .setDescription('Get a 5 stack going!'),

    async execute(interaction) {

        let player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
        let currentPlayers = 0;
        let embed = refreshEmbed(player);
        let btn = refreshButtonsZeroPlayers();

        const response = await interaction.reply({
            embeds: [embed],
            components: [btn],
            withResponse: true,
        });

        const collector = response.resource.message.createMessageComponentCollector({
            ComponentType: ComponentType.Button,
            time: 3_600_000
        });

        
        collector.on('collect', async collectedInteraction => {
            if (collectedInteraction.customId === 'join') {
                playerJoined(collectedInteraction)
            } else if (collectedInteraction.customId === 'cancel') {
                playerCancelled(collectedInteraction)
            } else if (collectedInteraction.customId === 'leave') {
                playerLeft(collectedInteraction);
            }
        });
        
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`)
        });

        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        async function playerJoined(interaction) {
            for (let i = 0; i < 4; i++) {
                if (player[i] == interaction.user) {
                    await interaction.reply({ content: "You're already on the list!", flags: MessageFlags.Ephemeral })
                        .then(console.log(`${interaction.user.username} tried to join twice`));
                    return;
                }
            }
            player[currentPlayers] = interaction.user;
            embed = refreshEmbed(player);
            if (currentPlayers == 0) {
                buttonsFull = refreshButtonsAll();
            } else if (currentPlayers == 4) {
                fullEmbed = embedFullStack(player);
                await interaction.update({ content: `Time to shine! ${player[0]}, ${player[1]}, ${player[2]}, ${player[3]}, ${player[4]}`, 
                    embeds: [fullEmbed], components: []});
                collector.stop();
                currentPlayers = 0;
                player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
                return;
            }
            await interaction.update({ content: `${interaction.user} Joined`, embeds: [embed], components: [buttonsFull]});
            currentPlayers++;
        }

        async function playerCancelled(interaction) {
            await interaction.update({ content: `${interaction.user} Cancelled the 5-stack`, embeds: [], components: []});
            collector.stop();
            currentPlayers = 0;
            player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
        }

        async function playerLeft(interaction) {
            if (currentPlayers == 1) {
                player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
                currentPlayers--;
                btns = refreshButtonsZeroPlayers();
                embed = refreshEmbed(player);
                await interaction.update({ content: `${interaction.user} Left`, embeds: [embed], components: [btns]});
            } else {
                for (let i = 0; i < 4; i++) {
                    if (player[i] == interaction.user) {
                        player[i] = '\u200B';
                        currentPlayers--;
                    }
                }
                player.sort();
                btns = refreshButtonsAll();
                embed = refreshEmbed(player);
                await interaction.update({ content: `${interaction.user} Left`, embeds: [embed], components: [btns]});
            }
        }
    },
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function refreshButtonsAll() {
    actionRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('join')
            .setLabel('Join!')
            .setStyle(ButtonStyle.Primary)
    ).addComponents(
        new ButtonBuilder()
            .setCustomId('leave')
            .setLabel('Leave')
            .setStyle(ButtonStyle.Secondary)
    ).addComponents(
        new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel 5-Stack')
            .setStyle(ButtonStyle.Danger)
    );
    return actionRow;
}

function refreshButtonsZeroPlayers() {
    actionRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('join')
            .setLabel('Join!')
            .setStyle(ButtonStyle.Primary)
    ).addComponents(
        new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel 5-Stack')
            .setStyle(ButtonStyle.Danger)
    );
    return actionRow;
}

function refreshEmbed(player) {
    stackEmbed = new EmbedBuilder()
        .setColor('#BF40BF')
        .setTitle('Current 5-stack:')
        .addFields(
            { name: "Player 1", value: `${player[0]}` },
            { name: "Player 2", value: `${player[1]}` },
            { name: "Player 3", value: `${player[2]}` },
            { name: "Player 4", value: `${player[3]}` },
            { name: "Player 5", value: `${player[4]}` }
        );
    return stackEmbed;
}

function embedFullStack(player) {
    stackEmbed = new EmbedBuilder()
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