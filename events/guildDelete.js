const discord = require("discord.js");
const beacons = require("../obj/beacons.js")

module.exports = {
    name:'guildDelete',
    execute(guild, bot){
        beacons.info('Left guild: ' + guild.name + ' (id: ' + guild.id + '). This guild has ' + guild.memberCount + ' members!');
        bot.user.setActivity('Present in ' + bot.guilds.size + ' servers')
    }
}
