const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Deletes set amount of messages that are newer than two weeks')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Number of messages to delete')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1)),
    async execute(interaction) {
        var numberToDelete = interaction.options.getInteger('number');
        interaction.channel.bulkDelete(numberToDelete, true);
        return interaction.reply(`Deleted ${numberToDelete} messages`);
    },
};