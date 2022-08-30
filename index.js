const discord = require('discord.js');
const filesystem = require('fs');
const User = require("./xp/dbObj");
const config = require("./super secret stuff/config.json");
const beacons = require("./obj/beacons.js")
const SQLite = require("better-sqlite3");
const { exceptions } = require('winston');
const sql = new SQLite("./guild_configs/uservalues.sqlite");

const bot = new discord.Client;

bot.commands = new discord.Collection();
bot.experiences = new discord.Collection();
bot.queues = new discord.Collection();

try{
  getvals = sql.prepare("SELECT * FROM uservalues WHERE user = ? AND guild = ?");
  setvals = sql.prepare("INSERT OR REPLACE INTO uservalues (id, user, guild, balance, xp, level) VALUES (@id, @user, @guild, @balance, @xp, @level);");
}catch(e){beacons.error(e)}

const commandFolders = filesystem.readdirSync("./commands");

for (const folder of commandFolders) 
{
    const commandFiles = filesystem
        .readdirSync(`./commands/${folder}`)
        .filter((f) => f.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
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
}

bot.login(config.token);