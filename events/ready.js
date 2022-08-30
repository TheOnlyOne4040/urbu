const discord = require("discord.js");
const beacons = require("../obj/beacons.js")
const SQLite = require("better-sqlite3");
const sql = new SQLite("./guild_configs/uservalues.sqlite");

module.exports ={
    name: "ready",
    once: true,
    async execute(bot)
    {
        const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'uservalues';").get();
        if (!table['count(*)']) {
          sql.prepare("CREATE TABLE uservalues (id TEXT PRIMARY KEY, user TEXT, guild TEXT, balance INTEGER, xp INTEGER, level INTEGER);").run();
          sql.prepare("CREATE UNIQUE INDEX idx_uservalues_id ON uservalues (id);").run();
          sql.pragma("synchronous = 1");
          sql.pragma("journal_mode = wal");
        }
        beacons.info('Urbu is all lubed up and ready to go. Currently Present in ' + bot.guilds.size + ' servers!')
        bot.user.setActivity('Present in ' + bot.guilds.size + ' servers');

        bot.channels.get("1005117208076242976").send({
            embed:{
                title: "Hello Everyone!",
                description: 'Urbu is all lubed up and ready to go. Currently Present in \`' + bot.guilds.size + '\` servers!',
                color: 0x3ca45c,
            }
        });
    }
}