const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const steam = require('steam-js-api');
steam.setKey(config.steamKey);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Shows the status of hiders')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of the person to show the status for')
				.setRequired(true)
				.addChoices({ 'name': 'Mostafa', 'value': 'mos' })
		),
	async execute(interaction) {
		const chosenString = interaction.options.getString('name');

		if (chosenString === 'mos') {
			steam.getPlayerSummaries(config.ducksId).then(result => {
				state = result.data.players[config.ducksId].state;
				if (state == 0) {
					return interaction.reply("Mostafa is offline");
				} else if (state == 1) {
					return interaction.reply("Mostafa is online");
				} else if (state == 3) {
					return interaction.reply("Mostafa left his computer on. Low chance he is online");
				} else {
					return interaction.reply("LOL");
				}
			})
		} else {
			return interaction.reply('?');
		}

	},
};