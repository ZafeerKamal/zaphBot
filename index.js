const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix, token, steamKey, mostafaSteamId } = require('./config.json');
const command = require('./command.js');
const path = require('path');
const { connect } = require('http2');

const steam = require('steam-js-api');
steam.setKey(steamKey);

client.on('ready', () => {
    console.log('The client is ready!')

    command(client, ["status", "stat", "st"], (message) => {
        if (message.content.includes("mos")) {
            steam.getPlayerSummaries(mostafaSteamId).then(result => {
                state = result.data.players[mostafaSteamId].state;
                if (state == 0) {
                    message.reply("Mostafa is offline");
                } else if (state == 1) {
                    message.reply("Mostafa is online");
                } else if (state == 3) {
                    message.reply("Mostafa left his computer on. Low chance he is online"); 
                } else {
                    message.reply("Mostafa is being gay. I cannot figure out if he's online or offline"); 
                }
            }).catch(console.error);
        }
    })
})

client.on('message', (message) => {
    if (message.author.bot) return;
    user = message.author;

    console.log(`[${message.author.tag}]: ${message.content}`)

    if (message.content.includes("val") || message.content.includes("sal")) {
        message.channel.send("bro please, its " + currentTime());  
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
            message.channel.send("bro please, its " + currentTime()); 
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
        if (i == role) {
            found = true;
        }
    });
    if (found == true) return true;
    return false;
}