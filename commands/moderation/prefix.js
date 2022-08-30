const Discord = require('discord.js');
const prefixes = require("../../guild_configs/prefixes.json");
const fs = require('fs');

module.exports ={
    name: 'prefix',
    group: 'moderation',
    memberName: 'prefix',
    description: 'changes the server prefix',
    usage: '<new prefix>',
    guildOnly: true,
    async execute(message, args)
    {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        for (var i = 0; i < prefixes.length; i++) 
        {
            if (prefixes[i].id == message.guild.id) 
            {
                prefixes[i].prefix = args[0];
                fs.writeFile("./guild_configs/prefixes.json", JSON.stringify(prefixes), function(err){if(err) throw err});
                return message.channel.send({
                    embed:{
                        title:'Success',
                        color: 0x3ca45c,
                        description: `Changed the server prefix to \`${prefixes[i].prefix}\`!`
                }})
            }
        }
    }
}