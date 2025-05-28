const { SlashCommandBuilder } = require('@discordjs/builders');
const { EC2Client, StartInstancesCommand } = require("@aws-sdk/client-ec2");
const { awsAccessKeyId, awsSecretAccessKey } = require('./../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startserver')
        .setDescription('Start the Instance'),
    async execute(interaction) {
        
        const ec2client = new EC2Client({
            region: 'ca-central-1',
            credentials: {
                accessKeyId: awsAccessKeyId,
                secretAccessKey: awsSecretAccessKey
            }
        });

        const instanceId = 'i-0a54720750336d978';
        
        try {
            const command = new StartInstancesCommand({ InstanceIds: [instanceId] });
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