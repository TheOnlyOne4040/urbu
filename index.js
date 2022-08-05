const discord = require('discord.js');
const filesystem = require('fs');
const User = require("./xp/dbObj");
const config = require("./super secret stuff/config.json");
const beacons = require("./obj/beacons.js")

const bot = new discord.Client;

bot.commands = new discord.Collection();
bot.experiences = new discord.Collection();
bot.queues = new discord.Collection();

Reflect.defineProperty(bot.experiences, "add", {
    value: async function add(id, amount, timestamp) {
      const user = await bot.experiences.get(id);
      if (user) {
        user.addXP(Number(amount));
        user.setLastMessageTime(timestamp);
        return user;
      }
      const newUser = await User.create({ user_id: id, experience:amount, last_message_time: timestamp}).catch(beacons.error);
      await bot.experiences.set(id, newUser);
      return newUser;
    },
  });
  Reflect.defineProperty(bot.experiences, "getExperience", {
    value: async function getBalance(id) {
      const user = await bot.experiences.get(id);
      return user
        ? user.experience
        : await User.create({ user_id: id, experience: 0, last_message_time: new Date().toString() }).then(user => user.experience).catch(beacons.error);
    },
  });

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