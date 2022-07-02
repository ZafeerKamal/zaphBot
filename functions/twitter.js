const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const needle = require('needle');

const token = config.twitter.bearerToken;
const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream';

const rules = [{
    'value': `from:${config.twitter.zaphId}`

}]

async function twitterFxn(channel) {
    let currentRules;

    try {
        currentRules = await getAllRules();
        await deleteAllRules(currentRules);
        await setRules();
        if (config.debug) console.log(currentRules);
    } catch (e) {
        console.error(e);
    }

    streamConnect(0, channel);
}

function discordMessage(channel, data) {

    embed = new MessageEmbed()
        .setColor('#FFFFFF')
        .addField(`${config.twitter.zaphAt} on Twitter:`, `${data.data.text}`);

    channel.send({embeds: [embed]});
}
// '\u200B'
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getAllRules() {
    const response = await needle('get', rulesURL, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
    if (response.statusCode !== 200) {
        console.log("Error:", response.statusMessage, response.statusCode);
        throw new Error(response.body);
    }
    return (response.body);
}

async function deleteAllRules(rules) {
    if (!Array.isArray(rules.data)) {
        return null;
    }
    const ids = rules.data.map(rule => rule.id);
    const data = {
        "delete": {
            "ids": ids
        }
    };
    const response = await needle('post', rulesURL, data, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    if (response.statusCode !== 200) {
        throw new Error(response.body);
    }
    return (response.body);
}

async function setRules() {
    const data = {
        "add": rules
    };
    const response = await needle('post', rulesURL, data, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    if (response.statusCode !== 201) {
        console.log(response.body);
        throw new Error(response.body);
    }
    return (response.body);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function streamConnect(retryAttempt, channel) {
    const stream = needle.get(streamURL, {
        headers: {
            "User-Agent": "v2FilterStreamJS",
            "Authorization": `Bearer ${token}`
        },
        timeout: 20000
    });
    stream.on('data', data => {
        try {
            const json = JSON.parse(data);
            if (config.debug) console.log(json);
            discordMessage(channel, json);
            retryAttempt = 0;
        } catch (e) {
            if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
                console.log(data.detail)
            } else {
            }
        }
    }).on('err', error => {
        if (error.code !== 'ECONNRESET') {
            console.log(error.code);
        } else {
            setTimeout(() => {
                console.warn("A connection error occurred. Reconnecting...")
                streamConnect(++retryAttempt);
            }, 2 ** retryAttempt)
        }
    });
    return stream;
}

module.exports = { twitterFxn };