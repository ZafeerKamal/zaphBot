const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix, token } = require('./config.json');
const command = require('./command.js');
const path = require('path');
const { connect } = require('http2');

client.on('ready', () => {
    console.log('The client is ready!')

    command(client, ['test', 'test1', 'test3'], (message) => {
        message.channel.send('Test Passed')
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

        saloRoleCheck = false;
        RolesNameArr.forEach(i => {
            if (i == "salo") {
                saloRoleCheck = true;
            }
        });
        if (saloRoleCheck == true) {
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