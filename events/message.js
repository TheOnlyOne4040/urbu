const discord = require("discord.js");
const { values } = require("lodash");
const prefixes = require("../guild_configs/prefixes.json");
const beacons = require("../obj/beacons.js");
const User = require("../xp/dbObj.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite("./guild_configs/uservalues.sqlite");
const fs = require("fs")

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

        let vals;
        if (message.guild) {
            vals = getvals.get(message.author.id, message.guild.id);
            if(!vals) {
                vals = {id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, balance: 50, xp: 0, level: 1 }
            }
            vals.xp++;
            currentLevel = Math.floor(Math.sqrt(vals.xp - 10));
            if(currentLevel < 1){currentLevel = 0;}
            if (vals.level < currentLevel) {
                vals.level++;
                message.reply(`You've leveled up to level **${currentLevel}**!`)
            }
            var randomint = Math.floor(Math.random() * 50);
            if(randomint == 1){
                let walletvalue = randomValue()
                message.reply(`you found $${walletvalue} in this channel!`)
                vals.balance += walletvalue
            }
            setvals.run(vals)
        }

        try{prefix = (prefixes.find(guild => guild.id == message.guild.id)).prefix}
        catch{
            beacons.debug(prefixes)
            newConf = {"id":`${message.guild.id}`,"prefix":">"};
            prefixes[prefixes.length] = newConf
            beacons.debug(prefixes)
            beacons.debug(JSON.stringify(prefixes))
            fs.writeFileSync("./guild_configs/prefixes.json", JSON.stringify(prefixes), function(err){if(err) beacons.error(err)});
            prefix = ">"
        }
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

function randomValue(){
    let value1 = Math.floor(Math.random() * 39) + 1
    let value2 = 0
    switch(ran = Math.floor(Math.random() * 100)){
        case ran < 50:
            value2 = 0;
            break;
        case ran < 75:
            value2 = 40;
            break;
        case ran < 88:
            value2 = 80;
            break;
        case ran < 94:
            value2 = 120;
            break;
        case ran < 97:
            value2 = 160;
            break;
        case ran < 99:
            value2 = 200;
            break;
        case ran <= 100:
            value2 = 500;
            break;
    }
    return(value1 + value2);
}