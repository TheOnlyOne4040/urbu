const Commando = require('discord.js-commando');
const discord = require('discord.js');

class WhoAmICommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'whoami',
            group: 'simple',
            memberName: 'whoami',
            description: 'Shows information about the sender'
        });
    }

    async run(message, args)
    {
        var sInfo = new discord.RichEmbed()
            .setTitle(message.author.username)
            .setDescription(message.author.discriminator)
            .addField("Member Since", message.author.createdAt, true)
            .addField("Presence", message.author.presence.status, true)
            .setColor(message.author.hexAccentColour)
            .setThumbnail(message.author.avatarURL)
            .setFooter("Urbu - The all-purpose bot", "https://cdn.discordapp.com/app-icons/910968930342944768/6a679783de11eedb859ef97b27d47cb0.png?size=256")
            .setTimestamp()

        message.channel.sendEmbed(sInfo);
    }
}

module.exports = WhoAmICommand;