const discord = require('discord.js');
const Commando = require('discord.js-commando');
const config = require("./super secret stuff/config.json");
const bot = new Commando.Client({commandPrefix: config.prefix});

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('moderation', 'Moderation');
bot.registry.registerGroup('audio', 'Audio');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

// FOR LATER
// bot.commands = new Discord.Collection();

// const commandFolders = filesystem.readdirSync("./commands");

// for (const folder of commandFolders) {
//   const commandFiles = filesystem
//     .readdirSync(`./commands/${folder}`)
//     .filter((file) => file.endsWith(".js"));
//   for (const file of commandFiles) {
//     const command = require(`./commands/${folder}/${file}`);
//     bot.commands.set(command.name, command);
//   }
// }

/*bot.on('message', function(message){
    if(message.content == 'Jointest')
    {
        message.member.send("Welcome to ***" + message.guild + "***.\nFor a list of commands, type 'help' here or '>help' in the server");
        message.member.send("Don't forget to check the server rules!");    
    }
});*/

bot.on("guildCreate", guild => {
    console.log('New guild joined: ' + guild.name + ' (id: ' + guild.id + '). This guild has ' + guild.memberCount + ' members!');
    bot.user.setActivity('Present in ' + bot.guilds.size + ' servers')
  });

bot.on("guildMemberAdd", function(member)
{
    member.send("Welcome to ***" + message.guild + "***.\nFor a list of commands, type 'help' here or '>help' in the server");
    member.send("Don't forget to check the server rules!");
});

bot.on('ready',function(){
    console.log("Urbu is all lubed up and ready to go. Currently Present in " + bot.guilds.size + ' servers!')
    bot.user.setActivity('Present in ' + bot.guilds.size + ' servers');
})

bot.login(config.token);