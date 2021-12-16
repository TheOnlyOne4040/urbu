const Discord = require('discord.js');

module.exports ={
    name: 'leave',
    group: 'audio',
    memberName: 'leave',
    alias: ['lv', 'disconnect', 'dc'],
    description: 'Leaves the voice channel.',
    guildOnly: true,
    async execute(message, args)
    {
        /*if(message.client.queues.has(message.guild))
        {
            return message.channel.send({embed:{
                title: 'Urbu Music Control',
                color: 0x3ca45c,
                description: 'I\'m already connected to a voice channel!'
            }})
        }*/
        if(!message.guild.me.voiceChannelID)
        {
            return message.channel.send({embed:{
                title: 'Urbu Music Control',
                color: 0x3ca45c,
                description: 'I\'m not connected to a voice channel!'
            }})
        }

        if(message.member.voiceChannelID != message.guild.me.voiceChannelID)
        {
            return message.channel.send({embed:{
                title: 'Urbu Music Control',
                color: 0x3ca45c,
                description: 'You aren\'t connected to my voice channel!'
            }})
        }
        await message.member.voiceChannel.leave();
        return message.channel.send({embed:{
            title: 'Urbu Music Control',
            color: 0x3ca45c,
            description: 'Disconnected!'
        }})
    }
}