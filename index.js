const Discord = require('discord.js');
const { prefix, token, steamKey, mostafaSteamId } = require('./config.json');
const command = require('./command.js');
const steam = require('steam-js-api');
const commandHandler = require('./commandHandler.js');
const client = new Discord.Client();

steam.setKey(steamKey);
date = new Date();


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
    
    if (message.content.match(/val/i) || message.content.match(/sal/i)) {
        replies = ["sad", "just sad honestly" , ":pensive:", "please bro, enough", ":worried:", ":skull:", ":frowning:"];
        rand = Math.floor(Math.random() * replies.length);
        message.channel.send(replies[rand]);  
    }

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
            replies = ["sad", "just sad honestly" , ":pensive:", "please bro, enough", ":worried:", ":skull:", ":frowning:"];
            rand = Math.floor(Math.random() * replies.length);
            message.channel.send(replies[rand]); 
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