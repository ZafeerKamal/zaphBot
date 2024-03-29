const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const val = require('../functions/valorantStats.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('valo_rcf_stats')
    .setDescription('Valorant stats for RCf')
    .addStringOption(option => 
        option.setName('player')
        .setDescription("The RCF member to get stats for")
        .setRequired(true)
        .addChoices(
            { name: config.val.ZAF.id, value: 'ZAF'},
            { name: config.val.MAS.id, value: 'MAS'},
            { name: config.val.TA.id, value: 'TA'},
            { name: config.val.OS.id, value: 'OS'},
            { name: config.val.SA.id, value: 'SA'},
            { name: config.val.AZ.id, value: 'AZ'},
            { name: config.val.MOS.id, value: 'MOS'},
            { name: config.val.TW.id, value: 'TW'},
            { name: config.val.MT.id, value: 'MT'},
            { name: config.val.A.id, value: 'A'}
        )),
    async execute(interaction) {
        var option = interaction.options.getString('player');

        var id = config.val[option].id;
        var tag = config.val[option].tag;
        
        await interaction.deferReply().catch(console.error);
        var player = await val.getPlayer(id, tag);
        var rank = await val.getMMR(id, tag);

        if (player.status == 404) {
            await interaction.editReply({ content: 'Not a player', ephemeral: true }).catch(console.error);
        } else if (player.status == 400) {
            await interaction.editReply({ content: 'Valorant API is down', ephemeral: true }.catch(console.error));
        } else if (player.status != 200) {
            await interaction.editReply({ content: "Something is down/broken. Ping zapphire", ephemeral: true}).catch(console.error);
        }
             
        msgEmbed = RefreshEmbed(player, rank);
        await interaction.editReply({embeds: [msgEmbed]}).catch(console.error); 
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function RefreshEmbed(player, rank) {
    playedCard = player.data.card.wide;

    stackEmbed = new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle(`${player.data.name}#${player.data.tag}'s Stats`)
        .addField('Level', `${player.data.account_level}`, true)
        .addField('Rank', `${rank.data.current_data.currenttierpatched}`, true)
        .addField('Elo', `${rank.data.current_data.elo}`, true)
        .addField('RR change', `${rank.data.current_data.mmr_change_to_last_game}`, true)
        .addField('Current RR', `${rank.data.current_data.ranking_in_tier}/100`, true)
        .addField('Last Updated', `${player.data.last_update}`, true)
        .setImage(playedCard);
    return stackEmbed;
}
