const { SlashCommandBuilder } = require('@discordjs/builders');
const { EC2Client, StopInstancesCommand } = require("@aws-sdk/client-ec2");
const { awsAccessKeyId, awsSecretAccessKey, awsInstanceId } = require('./../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stopserver')
        .setDescription('Stop the Instance'),
    async execute(interaction) {
        
        const ec2client = new EC2Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: awsAccessKeyId,
                secretAccessKey: awsSecretAccessKey
            }
        });

        try {
            const command = new StopInstancesCommand({ InstanceIds: [awsInstanceId] });
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