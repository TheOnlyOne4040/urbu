const discord = require("discord.js");
const beacons = require("../obj/beacons.js")

module.exports ={
    name: "ready",
    once: true,
    async execute(bot)
    {
        beacons.info('Urbu is all lubed up and ready to go. Currently Present in ' + bot.guilds.size + ' servers!')
        bot.user.setActivity('Present in ' + bot.guilds.size + ' servers');
    }
}