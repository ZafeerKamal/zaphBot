const config = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// Event Handling /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Command Handling /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const commands = [];
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '9' }).setToken(config.token);

//Guild Commands
rest.put(Routes.applicationGuildCommands(config.clientId, config.zaphGuildId), { body: commands })
    .then(() => console.log('Successfully registered application Guild commands.'))
    .catch(console.error);

//Global Commands
// rest.put(Routes.applicationCommands(config.clientId), { body: commands })
//     .then(() => console.log('Successfully registered application Global commands.'))
//     .catch(console.error);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// Start //////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
client.login(config.token);