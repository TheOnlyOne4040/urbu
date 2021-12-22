const Discord = require('discord.js');

module.exports ={
    name: 'join',
    group: 'audio',
    memberName: 'join',
    alias: ['j', 'jn'],
    description: 'Joins the voice channel.',
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
        if(!message.member.voiceChannelID)
        {
            return message.channel.send({embed:{
                title: 'Urbu Music Control',
                color: 0x3ca45c,
                description: 'You aren\'t connected to a voice channel!'
            }})
        }
        await message.member.voiceChannel.join();
        return message.channel.send({embed:{
            title: 'Urbu Music Control',
            color: 0x3ca45c,
            description: 'Successfully connected!'
        }})
    }
}