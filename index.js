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
    var user;
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
    
    } else if (message.content === '<@!772349371647918080>') {
        message.reply(`hehehe`)

    } else if (message.content === '<@!186554849196769280>') {
        message.reply(`gerb`)

    } else if (message.content === '<@!220968762256392193>') {
        message.channel.send(`What's bitcoin saying?`)

    } else if (message.content === 'time out ') {
        message.channel.send('WHO IS THE GERB?')
        
    }


});



client.login(token)