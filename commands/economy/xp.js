const Discord = require('discord.js');
const beacons = require("../../obj/beacons.js")

module.exports={
    name: 'xp',
    group: 'economy',
    memberName: 'xp',
    alias: ['experience', 'level', 'lvl'],
    description: 'Shows the user\'s current experience points and level',
    guildOnly: true,
    async execute(message, args)
    {
        vals = getvals.get(message.author.id, message.guild.id);
        return message.channel.send({
            embed:{
                title:'Experience',
                color: 0x3ca45c,
                description: `**XP:   ** ${vals.xp}\n**LEVEL:** ${vals.level}`
        }})
    }
}