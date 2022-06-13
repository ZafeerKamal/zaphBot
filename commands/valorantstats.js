const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const val = require('../functions/valorantStats.js');

var player = ['\u200B', '\u200B', '\u200B', '\u200B', '\u200B'];
var currentPlayers = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('valorantstats')
        .setDescription('In-game stats for Valorant')
        .addStringOption(option => 
            option.setName('player_id')
            .setDescription("The player's account name")
            .setRequired(true))
        .addStringOption(option => 
            option.setName('player_tag')
                .setDescription("The player's account TAG (ex. #NA1)")
                .setRequired(true))
            ,
    async execute(interaction) {
        var id = interaction.options.getString('player_id');
        var tag = interaction.options.getString('player_tag');
        var player = await val.getPlayer(id, tag);
        
        if (player.status == 404) {
            await interaction.reply({ content: 'Not a player', ephemeral: true });
        } else if (player.status == 400) {
            await interaction.reply({ content: 'Valorant API is down', ephemeral: true })
        }
        
        var rank = await val.getMMR(id, tag);
        //
        console.log(rank);
        //

        
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
