const Discord = require('discord.js');
const { prefix, token, steamKey, mostafaSteamId, debugID } = require('./config.json');
const command = require('./command.js');
const steam = require('steam-js-api');
const commandHandler = require('./commandHandler.js');
const client = new Discord.Client();

steam.setKey(steamKey);
date = new Date();
mosState = 0;

client.on('ready', () => {
    console.log('The client is ready!');

})

client.on('message', (message) => {
    user = message.author;
    console.log(`[${message.author.tag}]: ${message.content}`);

    if (message.channel.type === 'news') {
        message.crosspost()
            .catch(console.error);
    }

    updaterChannel = client.channels.cache.find(channel => channel.name == "mostafa-updates");
    var intervalStatus = setInterval(statusFunction, 1000 * 60, updaterChannel);

    if (message.content.startsWith(`${prefix}`)) {
        commandHandler(client, steam, message);
    }
    
    // ----------------------- Valorant Bullyer ------------------------

    // if (message.content.match(/val/i) || message.content.match(/sal/i)) {
    //     replies = ["sad", "just sad honestly" , ":pensive:", "please bro, enough", ":worried:", ":skull:", ":frowning:"];
    //     rand = Math.floor(Math.random() * replies.length);
    //     message.channel.send(replies[rand]);  
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

        // ------------- Valorant Bullyer Part 2 -----------------------------------

        // if (RoleChecker(RolesNameArr, "salo")) {
        //     replies = ["sad", "just sad honestly" , ":pensive:", "please bro, enough", ":worried:", ":skull:", ":frowning:"];
        //     rand = Math.floor(Math.random() * replies.length);
        //     message.channel.send(replies[rand]); 
        // }
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

function statusFunction(channel) {
    console.log("Reached statusFunction");
    console.log(`State: ${state}`);
    steam.getPlayerSummaries(mostafaSteamId).then(result => {
        state = result.data.players[mostafaSteamId].state;
        
        console.log(`State: ${state}`);
        console.log(`mosState: ${mosState}`);
        
        if (mosState != state) {
            if (state == 0) {
                channel.send("Mostafa is offline");
            } else if (state == 1) {
                channel.send("Mostafa is online");
            } else if (state == 3) {
                channel.send("Mostafa left his computer on. Low chance he is online"); 
            } else {
                channel.send("Cannot figure out if he's online or offline. Check logs"); 
            }
            mosState = state;
        }
    })
}