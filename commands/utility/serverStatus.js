const { SlashCommandBuilder } = require('@discordjs/builders');
const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");
const { awsAccessKeyId, awsSecretAccessKey, awsInstanceId } = require('./../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstatus')
        .setDescription('Display the instance status'),
    async execute(interaction) {
        
        const ec2client = new EC2Client({
            region: 'ca-central-1',
            credentials: {
                accessKeyId: awsAccessKeyId,
                secretAccessKey: awsSecretAccessKey
            }
        });
        
        try {
            const command = new DescribeInstancesCommand({ InstanceIds: [awsInstanceId]});
            const resp = await ec2client.send(command);
            const status = resp.Reservations[0].Instances[0].State.Name;
            console.log(`serverStatus.js: Status: ${status}`);
            interaction.reply(`Instance Status: ${status}`);
        } catch (err) {
            console.error('Error getting status:', err);
            interaction.reply('Failed to get server status');
        }
        
    },
};