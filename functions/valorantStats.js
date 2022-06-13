const config = require('../config.json');
const val = require("unofficial-valorant-api");

async function getPlayer(playerID, playerTag) {
    var account = await val.getAccount(playerID, playerTag).catch(console.error);
    return account;
}

async function getMMR(playerID, playerTag) {
    var data = await val.getMMR('v2', 'na', playerID, playerTag).catch(console.error);
    return data
}

module.exports = { getPlayer, getMMR };