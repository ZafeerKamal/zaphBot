const Discord = require('discord.js');
const command = require('./command.js');
const steam = require('steam-js-api');
const commandHandler = require('./commandHandler.js');
const client = new Discord.Client();

const config = require('./config.json');
steam.setKey(config.steamKey);
date = new Date();

client.on('ready', () => {
    console.log('The client is ready!');

    var statusUpdaterChannel = client.channels.cache.find(channel => channel.name == "mostafa-status-updates");
    var intervalStatus = setInterval(currentStatusFunction, 1000 * 30, statusUpdaterChannel);
    
})

client.on('message', (message) => {
    user = message.author;
    console.log(`[${message.author.tag}]: ${message.content}`);

    if (message.channel.type === 'news') {
        message.crosspost().catch(console.error);
    }



    if (message.content.startsWith(`${config.prefix}`)) {
        commandHandler(client, steam, message);
    }
});

client.login(config.token)

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Functions /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRoleArray(message) {
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
        return(RolesNameArr);
    }
}

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

function currentStatusFunction(channel) {
    console.log("Reached statusFunction");
    storedState = config.mostafaState;

    steam.getPlayerSummaries(config.mostafaId).then(result => {
        var currState = result.data.players[config.mostafaId].state;
        
        console.log(`storedState: ${storedState}`);
        console.log(`currState: ${currState}`);
        
        if (storedState != currState) {
            // 0 = offline
            // 1 = online
            // 3 = away
            // else = ?
            if (currState == 0) {
                channel.send("Mostafa is offline");
            } else if (currState == 1) {
                channel.send("Mostafa is online");
            // } else if (currState == 3) {
            //     channel.send("Mostafa left his computer on. Low chance he is online"); 
            // } else {
            //     channel.send("Cannot figure out if he's online or offline. Check logs"); 
            }
            config.mostafaState = currState;
        }
    })
}