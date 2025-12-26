const { SlashCommandBuilder } = require('@discordjs/builders');
const { EC2Client, StopInstancesCommand } = require("@aws-sdk/client-ec2");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stopserver')
        .setDescription('Stop the Instance'),
    async execute(interaction) {
        
        const ec2client = new EC2Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        try {
            const command = new StopInstancesCommand({ InstanceIds: [process.env.AWS_INSTANCE_ID] });
            const resp = await ec2client.send(command);
            const state = resp.StoppingInstances[0].CurrentState.Name;
            console.log(`stopserver.js: State: ${state}`);
            interaction.reply(`Stopping the instance`);
        } catch (err) {
            console.error('Error Stopping instance:', err);
            interaction.reply('Error Stopping instance');
        }
    },
};