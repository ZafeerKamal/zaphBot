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
            { name: 'zapphire', value: 'ZAF'},
            { name: 'yukki', value: 'MAS'},
            { name: 'The Avenger', value: 'TA'},
            { name: 'Valentissimo', value: 'OS'},
            { name: 'Yazuø', value: 'SA'},
            { name: 'jaheek0', value: 'AZ'},
            { name: 'fighting4ster', value: 'MOS'},
            { name: 'Takenshen', value: 'TW'},
            { name: 'tauqir2', value: 'MT'},
            { name: 'Jetsly', value: 'A'}
        )),
    async execute(interaction) {
        var option = interaction.options.getString('player');

        var id = config.val[option].id;
        var tag = config.val[option].tag;
        

        var player = await val.getPlayer(id, tag).catch(console.error);
        var rank = await val.getMMR(id, tag).catch(console.error);

        if (player.status == 404) {
            await interaction.reply({ content: 'Not a player', ephemeral: true });
        } else if (player.status == 400) {
            await interaction.reply({ content: 'Valorant API is down', ephemeral: true });
        } else if (player.status != 200) {
            await interaction.reply({ content: "Something is down/broken. Ping zapphire", ephemeral: true});
        }
             
        msgEmbed = embed(player, rank);
        await interaction.reply({embeds: [msgEmbed]});  
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function embed(player, rank) {
    stackEmbed = new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle(`${player.data.name}#${player.data.tag}'s Stats`)
        .addField('Level', `${player.data.account_level}`, true)
        .addField('Rank', `${rank.data.current_data.currenttierpatched}`, true)
        .addField('Elo', `${rank.data.current_data.elo}`, true)
        .addField('RR change', `${rank.data.current_data.mmr_change_to_last_game}`, true)
        .addField('Current RR', `${rank.data.current_data.ranking_in_tier}/100`, true)
        .addField('Last Updated', `${player.data.last_update}`, true)
        .setImage(player.data.card.wide)
        .setURL(`https://tracker.gg/valorant/profile/riot/${player.data.name}%23${player.data.tag}/overview`);
    return stackEmbed;
}