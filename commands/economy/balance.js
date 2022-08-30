const Discord = require('discord.js');
const beacons = require("../../obj/beacons.js")

module.exports={
    name: 'balance',
    group: 'economy',
    memberName: 'balance',
    alias: ['bal', 'wallet'],
    description: 'Shows the user\'s current balance',
    guildOnly: true,
    async execute(message, args)
    {
        vals = getvals.get(message.author.id, message.guild.id);
        return message.channel.send({
            embed:{
                title:'Bank balance',
                color: 0x3ca45c,
                description: `$${vals.balance}`
        }})
    }
}