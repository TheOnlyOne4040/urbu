const discord = require("discord.js");
const welcomes = require("../guild_configs/welcomes.json");

module.exports = {
    name:'guildMemberAdd',
    execute(member){
        let msg = (welcomes.find(guild => guild.id == member.guild.id)).message
        member.send({embed:
        {
            title: "Welcome",
            color: 0x3ca45c,
            description: msg
        }})
    }
}
