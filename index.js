const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, steamKey, mostafaSteamId } = require('./config.json');
const command = require('./command.js');
// const path = require('path');
// const { connect } = require('http2');
const steam = require('steam-js-api');
steam.setKey(steamKey);
const commandHandler = require('./commandHandler.js');

client.on('ready', () => {
    console.log('The client is ready!')
})

client.on('message', (message) => {
    if (message.author.bot) return;
    user = message.author;

    console.log(`[${message.author.tag}]: ${message.content}`)

    if (message.content.startsWith(`${prefix}`)) {
        commandHandler(client, steam, message);
    }
    
    // if (message.content.match(/val/i) || message.content.match(/sal/i)) {
    //     message.channel.send("bro please, its " + currentTime());  
    // }

   if (message.content.includes("<@&")) {
        key = message.mentions.roles.keys();
        RoleId = key.next().value;
        RolesIdArr = [];
        RolesNameArr = [];

        for (i = 0; RoleId != null; i++) {
            RolesIdArr[i] = RoleId;
            //console.log(RoleId); 
            RoleId = key.next().value;
        }
        //console.log(RolesIdArr);
        for (i = 0 ; i < RolesIdArr.length ; i++) {
            RolesNameArr[i] = message.mentions.roles.get(RolesIdArr[i]).name;
        }
        //console.log(RolesNameArr);

        if (RoleChecker(RolesNameArr, "salo")) {
            message.channel.send("sad"); 
        }
    }
});

client.login(token)

function getMentionId(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return client.users.cache.get(mention);
    }
}

function getRoleId(role) {
    if (!role) return;
    if (role.startsWith('<@&') && role.endsWith('>')) {
        role = role.slice(3, -1);
    }
    return role;
}

function currentTime() {
    date = new Date();
    hour = date.getHours();
    AmOrPm = "am";
    mins = date.getMinutes();
    if (hour > 12) {
        hour -=  12;
        AmOrPm = "pm";
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return (hour + ":" + mins + AmOrPm);
}

function RoleChecker (arr, role) {
    found = false; 
    arr.forEach(i => {
        if (i.toLowerCase() == role) {
            found = true;
        }
    });
    if (found == true) return true;
    return false;
}