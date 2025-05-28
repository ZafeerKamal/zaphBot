const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Deletes the specified amount of messages')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Number of messages to delete')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1)),
    async execute(interaction) {
        var numberToDelete = interaction.options.getInteger('number');
        interaction.channel.bulkDelete(numberToDelete, true);
        await interaction.reply({content: `Deleted ${numberToDelete} messages`, flags: MessageFlags.Ephemeral})
    },
};