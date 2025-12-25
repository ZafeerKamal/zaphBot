const { SlashCommandBuilder } = require('@discordjs/builders');
const { EC2Client, StartInstancesCommand } = require("@aws-sdk/client-ec2");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startserver')
        .setDescription('Start the Instance'),
    async execute(interaction) {
        
        const ec2client = new EC2Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        try {
            const command = new StartInstancesCommand({ InstanceIds: [process.env.AWS_INSTANCE_ID] });
            const resp = await ec2client.send(command);
            const state = resp.StartingInstances[0].CurrentState.Name;
            console.log(`startserver.js: State: ${state}`);
            interaction.reply(`Starting the instance`);
        } catch (err) {
            console.error('Error Starting instance:', err);
            interaction.reply('Error Starting instance');
        }
    },
};