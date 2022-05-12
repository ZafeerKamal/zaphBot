const config = require('../config.json');
const steam = require('steam-js-api');
steam.setKey(config.steamKey);

function currentStatusFunction(channel) {
    var ID = config.ducksId;
    var storedState = config.storedState;

    steam.getPlayerSummaries(ID).then(result => {
        var currState = result.data.players[ID].state;

        if (storedState != currState ) {
            // 0 = offline
            // 1 = online
            // 3 = away
            // else = ?
            if (currState == 0) {
                channel.send("Mostafa is offline");
                config.storedState = currState;
            } else if (currState == 1) {
                channel.send("Mostafa is online");
                config.storedState = currState;
            }
        }
    })
}

module.exports = { currentStatusFunction };