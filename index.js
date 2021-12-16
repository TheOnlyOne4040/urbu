const discord = require('discord.js');
const filesystem = require('fs');
const config = require("./super secret stuff/config.json");
const bot = new discord.Client;

bot.commands = new discord.Collection();
bot.queues = new discord.Collection();

const commandFolders = filesystem.readdirSync("./commands");

for (const folder of commandFolders) 
{
    const commandFiles = filesystem
        .readdirSync(`./commands/${folder}`)
        .filter((f) => f.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
        console.log(command)
    }
}

const eventFiles = filesystem
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) 
{
    const event = require(`./events/${file}`);
    if (event.once) 
    {
        bot.once(event.name, (...args) => event.execute(...args, bot));
    } else 
    {
        bot.on(event.name, (...args) => event.execute(...args, bot));
    }
    console.log(event)
}

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

bot.on('ready',function()
{
    console.log("Urbu is all lubed up and ready to go. Currently Present in " + bot.guilds.size + ' servers!')
    bot.user.setActivity('Present in ' + bot.guilds.size + ' servers');
    console.log(bot.guilds.map(r => `${r.name} - ${r.id}`));
})

bot.login(config.token);