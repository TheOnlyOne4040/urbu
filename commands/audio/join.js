const Commando = require("discord.js-commando")
const Discord = require('discord.js');

class JoinCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'join',
            group: 'moderation',
            memberName: 'join',
            description: 'Joins the voice channel.',
            guildOnly: true
        });
    }

    async run(message, args)
    {
        /*if(message.client.queues.has(message.guild))
        {
            return message.channel.send({embed:{
                title: 'Urbu Music Control',
                color: 0x3ca45c,
                description: 'I\'m already connected to a voice channel!'
            }})
        }*/
        if(!message.author.voice.channel)
        {
            return message.member.send({embed:{
                title: 'Urbu Music Control',
                color: 0x3ca45c,
                description: 'You aren\'t connected to a voice channel!'
            }})
        }

        await message.member.voice.channel.join();
        return message.channel.send({embed:{
            title: 'Urbu Music Control',
            color: 0x3ca45c,
            description: 'Successfully connected!'
        }})
    }
}

module.exports = JoinCommand