const Discord = require('discord.js');
const welcomes = require("../../guild_configs/welcomes.json");
const fs = require('fs');

module.exports ={
    name: 'welcomemsg',
    group: 'moderation',
    memberName: 'welcomemsg',
    description: 'changes the server\'s welcome message.',
    usage: '<new message>',
    guildOnly: true,
    async execute(message, args)
    {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        for (var i = 0; i < welcomes.length; i++) 
        {
            if (welcomes[i].id == message.guild.id) 
            {
                welcomes[i].message = args.join(' ');
                fs.writeFile("./guild_configs/welcomes.json", JSON.stringify(welcomes), function(err){if(err) throw err});
                return message.channel.send({
                    embed:{
                        title:'Success',
                        color:0x3ca45c,
                        description:`Changed the server's welcome message to\n\`${args.join(' ')}\``
                    }
                })
            }
        }

        newConf = {"id":message.guild.id,"message":args.join(' ')}
        welcomes[welcomes.length] = newConf
        fs.writeFile("./guild_configs/welcomes.json", JSON.stringify(welcomes), function(err){if(err) throw err});
        return message.channel.send({
            embed:{
                title:'Success',
                color:0x3ca45c,
                description:`Changed the server's welcome message to:\n\`${args.join(' ')}\``
            }
        })
    }
}