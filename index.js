const Discord = require('discord.js') // Requires the discord.js module
const client = new Discord.Client() // Created a discord client

const { prefix, token } = require('./config.json'); // Takes in info from the config.json file
const command = require('./command.js') 
const path = require('path');
const { connect } = require('http2');

var today = new Date();

client.on('ready', () => {
    console.log('The client is ready!')

    command(client, ['test', 'test1', 'test3'], (message) => {
        message.channel.send('Test Passed')
    })

    

})


client.on('message', (message) => {

    if (message.author.bot) return; 

    var user;
    console.log(`[${message.author.tag}]: ${message.content}`);
  

    //if (message.content === 'among us' ) {
    if (message.content.includes("among us")) {
        message.channel.send({files: ["./Assets/imp.jpg"]});
        const { voice } = message.member
        if (!voice.channelID) {
            message.reply('You must be in a voice channel')
            return
        }
        voice.channel.join().then((connection) => {
            connection.play(path.join(__dirname, 'Assets/AU.mp3'))
        })
    }

    if (message.content.includes("run") || message.content.includes("val")) {
        let x = Math.floor(Math.random() * 6);

        switch(x) {
            case 0:
                message.channel.send("no valorant allowed", {files: ["./Assets/val.png"]}) 
                break;
            case 1: 
                message.channel.send("no valorant allowed", {files: ["./Assets/val2.png"]}) 
                break;
            case 2: 
                message.channel.send("no valorant allowed", {files: ["./Assets/val3.png"]}) 
                break;
            case 3: 
                message.channel.send("no valorant allowed", {files: ["./Assets/val4.png"]}) 
                break;
            case 4: 
                message.channel.send("no valorant allowed", {files: ["./Assets/val5.png"]}) 
                break;
            case 5: 
                message.channel.send("no valorant allowed", {files: ["./Assets/val6.png"]}) 
                break;
        }

    }

});

client.login(token)

function getMention(mention) {

    if (!mention) {
        return;
    }

    if (mention.startsWith('<@') && mention.endsWith('>')) {

        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}