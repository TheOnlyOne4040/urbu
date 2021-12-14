const Discord = require('discord.js');

module.exports ={

    name: 'purge',
    group: 'moderation',
    memberName: 'purge',
    description: 'Deletes the previous X messages.',
    usage: '<quantity>',
    guildOnly: true,
    async execute(message, args)
    {
        const amount = parseInt(args.split(" ")[0]) + 1;
        if (isNaN(amount))
            return message.reply('Invalid Number');
        else if (amount-1 < 1 || amount-1 > 100)
            return message.reply('Amount should be between 1 and 100')
        
        var m_embed = new Discord.RichEmbed()
            .setTitle("Success")
            .setColor(0x3ca45c)
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        }).then(messages=>{message.channel.send({
            embed:{
                title:'Success',
                color:0x3ca45c,
                description:`Deleted \`${messages.size-1}\` messages!`
            }
        })})
    }
}

// `<>` <- arguments, [] <- programmatically chosen values, ()
// dynamic help command
// handling args msg.content.split("")[1:]
//
//