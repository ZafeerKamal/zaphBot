const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: config.openAI.orgId,
    apiKey: config.openAI.apiKey,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Generate a picture created by an AI. Use commas')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Generation query for the image')
                .setRequired(true)),
    async execute(interaction) {

        var query = interaction.options.getString('query');
        await interaction.reply(`Loading...`);

        const response = await openai.createImage({
            prompt: query,
            n: 1,
            size: "1024x1024"
        });

        var embed = embedder(response.data.data[0].url, query);

        if (config.debug) console.log(response);

        await interaction.editReply({content: '\u200B', embeds: [embed]}).catch(console.error); 
    },
};

function embedder(pic, query) {
    stackEmbed = new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle(`AI Image Generation`)
        .setDescription(`Query: ${query}`)
        .setImage(`${pic}`)
    return stackEmbed;
}
