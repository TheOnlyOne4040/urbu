const { prefix } = require("../super secret stuff/config.json")
const discord = require("discord.js");

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
            message.channel.send("help command not yet implemented")
        }

        if (!message.content.startsWith(prefix)) return console.log;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        if (!args) return;
        const commandName = args.shift().toLowerCase();

        const command =
            bot.commands.find((com) => com.name == commandName) ||
            bot.commands.find((com) => com.alias && com.alias.includes(commandName));
        if(!command) return;

        if (command.args && !args.length) return message.channel.send(
        {embed: 
            {
                color: 0x3ca45c,
                description: `You didnt provide any arguments.\nUsage:\`${prefix}${command.name} ${command.usage}`,
            },
        });

        command.execute(message, args).catch((e) => 
        {
            console.log(("[ERROR] "), e)
        })
    }
}