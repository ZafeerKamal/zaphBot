const { Events } = require('discord.js');
const { mcListenerStart } = require('./../mcListener');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		mcListenerStart(client)
	},
};