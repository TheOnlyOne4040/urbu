const Commando = require('discord.js-commando');
const discord = require('discord.js');

class WhereAmICommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'whereami',
            group: 'simple',
            memberName: 'whereami',
            description: 'Shows server information'
        });
    }

    async run(message, args)
    {
        var sInfo = new discord.RichEmbed()
            .setTitle(message.guild.name)
            .setDescription("This card shows the information about this server")
            .addField("Guild Owner", message.guild.owner, true)
            .addField("Member Count",  message.guild.memberCount, true)
            .addField("Online Members", message.guild.members.filter(m => m.presence.status === 'online').size, true)
            .addField("Bot Users", message.guild.members.filter(m => m.user.bot).size, true)
            .setColor(0x3ca45c)
            .setThumbnail(message.guild.iconURL)
            .setFooter("Urbu - The all-purpose bot", "https://cdn.discordapp.com/app-icons/910968930342944768/6a679783de11eedb859ef97b27d47cb0.png?size=256")
            .setTimestamp()

        message.channel.sendEmbed(sInfo);
    }
}

module.exports = WhereAmICommand;