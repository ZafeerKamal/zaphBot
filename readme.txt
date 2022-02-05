To run this app for development, assuming you have the config.json file containing the token.

    In a terminal install nodemon:
        run: npm install nodemon -g
    This installs nodemon globally.
    Once nodemon is installed,
        run: nodemon index.js

    Or if you have Node.js installed
        node index.js

    This will deploy the discord bot.

Config File: 
{
    "token": "TOKEN-HERE",
    "prefix": "PREFIX-HERE",
    "steamKey": "STEAM-KEY-HERE"
}