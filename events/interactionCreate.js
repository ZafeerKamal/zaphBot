module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction).catch(console.error);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command. Try again!', ephemeral: true }).catch(console.error);
        }
    }
}