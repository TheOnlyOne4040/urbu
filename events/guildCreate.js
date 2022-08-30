const discord = require("discord.js");
const beacons = require("../obj/beacons.js")
var prefixes = require("../guild_configs/prefixes.json");
const fs = require("fs")

module.exports = {
    name:'guildCreate',
    execute(guild, bot){
        beacons.info('New guild joined: ' + guild.name + ' (id: ' + guild.id + '). This guild has ' + guild.memberCount + ' members!');
        bot.user.setActivity('Present in ' + bot.guilds.size + ' servers');
        for (var i = 0; i < prefixes.length; i++) 
        {
            if (prefixes[i].id == guild.id) return
        }

        newConf = {"id":`${guild.id}`,"prefix":">"}
        prefixes[prefixes.length] = newConf
        fs.writeFile("./guild_configs/prefixes.json", JSON.stringify(prefixes), function(err){if(err) beacons.error(err)});
    }
}