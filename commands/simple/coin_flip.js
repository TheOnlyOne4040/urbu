module.exports={
    name: 'flip',
    group: 'simple',
    memberName: 'flip',
    description: 'Flips a coin',
    async execute(message, args)
    {
        var chance = Math.floor(Math.random() * 2);
        if(chance == 0)
        {
            message.reply('Heads!')
        }
        else
        {
            message.reply('Tails!')
        }
    }
}