const Discord = require('discord.js') // Requires the discord.js module
const client = new Discord.Client() // Created a discord client

const { prefix, token } = require('./config.json'); // Takes in info from the config.json file
const command = require('./command.js') 

client.on('ready', () => {
    console.log('The client is ready!')

    command(client, ['test', 'test1', 'test3'], (message) => {
        message.channel.send('Test Passed')
    })

    command(client, 'test2', (message) => {
        message.channel.send('Test for case 2 only passed')
    })

})


client.on('message', (message) => {
    console.log(message.content);

   
    
    

    if (message.content === 'test') {
        message.channel.send('hehe');

    } else if (message.content === 'prefix') {
        message.channel.send('hehe');
    
    } else if (message.content === 'idtest') {
        message.channel.send(`Username: ${message.author.username}`)
        message.channel.send(`ID: ${message.author.id}`)
        message.channel.send(`Tag: ${message.author.tag}`)
    
    } else if (message.content === 'tagtest') {
        message.reply(`hehehe`)
    }


});



client.login(token)