const discord = require("discord.js");
const prefixes = require("../guild_configs/prefixes.json");
const beacons = require("../obj/beacons.js")
const User = require("../xp/dbObj.js")

module.exports ={
    name: "message",
    async execute(message, bot)
    {
        if(message.author.bot) return;

        if (message.channel.type == "dm" && message.content.toLowerCase() != "help") return message.channel.send(
        {embed: 
            {
                color: 0x3ca45c,
                description: `Urbu does not support DM commands other than \`help\`. Please try again in a server.`,
            },
        });
        else if (message.content.toLowerCase() == "help")
        {
            return message.channel.send("help command not yet implemented")
        }

        /*let user = await User.findOne({
            where:{user_id:message.author.id}
        });
        if(!user) user = bot.experiences.add(message.author.id, 0, message.createdTimestamp);
        else{
            const ms = message.createdTimestamp - user.last_message_time
            if(ms > 2000)
            {
                const experience = Math.floor(Math.random() * 3) + 1;
                bot.experiences.add(message.author.id, experience, message.createdTimestamp);
            }
        }*/

        let prefix = (prefixes.find(guild => guild.id == message.guild.id)).prefix
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        if (!args) return;
        const commandName = args.shift().toLowerCase();

        const command =
            bot.commands.find((com) => com.name == commandName) ||
            bot.commands.find((com) => com.alias && com.alias.includes(commandName));
        if(!command) return;

        if (command.usage && !args.length) return message.channel.send(
        {embed: 
            {
                color: 0x3ca45c,
                title: "ERROR",
                description: `You didnt provide any arguments.`,
                fields:
                    [{
                        name: 'Usage',
                        value: `\`${prefix}\` \`${command.name}\` \`${command.usage}\``,
                    }],
            },
        });

        
        command.execute(message, args).catch((e) => 
        {
            beacons.error(e)
        })
    }
}