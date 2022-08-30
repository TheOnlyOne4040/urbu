const Discord = require('discord.js');
const beacons = require("../../obj/beacons.js")

module.exports={
    name: 'slot',
    group: 'economy',
    memberName: 'slot',
    alias: ['spin', 'fruit', 'slots'],
    description: 'spins the fruit machine',
    usage: '<bet>',
    guildOnly: true,
    async execute(message, args)
    {
        bet = args[0];
        if(bet % 5 != 0){return message.reply("Your bet must be a multiple of $5")}
        if(bet == 0){return message.reply("You cannot bet nothing")}

        vals = getvals.get(message.author.id, message.guild.id);
        if(bet > vals.balance){return message.reply("You do not have enough cash for this transaction.")}

        vals.balance -= bet
        let multiplier = bet/5

        let wheel1 = getfruit();
        let wheel2 = getfruit();
        let wheel3 = getfruit();

        let wheel1emoji = ""
        let wheel2emoji = ""
        let wheel3emoji = ""

        let reward = 0

        if(wheel1 == wheel2 && wheel2 == wheel3){
            switch(wheel1){
                case "cherry":
                    reward = 30
                    wheel1emoji = "🍒"; wheel2emoji = "🍒";wheel3emoji = "🍒";
                    break;
                case "lemon":
                    reward = 20
                    wheel1emoji = "🍒"; wheel2emoji = "🍒";wheel3emoji = "🍒";
                    break;
                case "cashbag":
                    reward = 1000
                    wheel1emoji = "🍒"; wheel2emoji = "🍒";wheel3emoji = "🍒";
                    break;
                case "apple":
                    reward = 20
                    wheel1emoji = "🍒"; wheel2emoji = "🍒";wheel3emoji = "🍒";
                    break;
                case "black":
                    reward = 50
                    wheel1emoji = "🍒"; wheel2emoji = "🍒";wheel3emoji = "🍒";
                    break;
                case "7":
                    reward = 500
                    wheel1emoji = "🍒"; wheel2emoji = "🍒";wheel3emoji = "🍒";
                    break;
                case "change":
                    reward = 100
                    wheel1emoji = "🍒"; wheel2emoji = "🍒";wheel3emoji = "🍒";
                    break;
                case "ban":
                    reward = 150
                    wheel1emoji = "🍒"; wheel2emoji = "🍒";wheel3emoji = "🍒";
                    break;
            }}
        else{
            switch(wheel1){
                case "cherry":
                    wheel1emoji = "🍒";
                    break;
                case "lemon":
                    wheel1emoji = "🍋";
                    break;
                case "cashbag":
                    reward += 10
                    wheel1emoji = "💰";
                    break;
                case "apple":
                    wheel1emoji = "🍎";
                    break;
                case "black":
                    reward += 2
                    wheel1emoji = "⚫";
                    break;
                case "7":
                    wheel1emoji = "7️⃣";
                    break;
                case "change":
                    reward += 5
                    wheel1emoji = "💲";
                    break;
                case "ban":
                    wheel1emoji = "❌";
                    break;
            }switch(wheel2){
                case "cherry":
                    wheel2emoji = "🍒";
                    break;
                case "lemon":
                    wheel2emoji = "🍋";
                    break;
                case "cashbag":
                    reward += 10
                    wheel2emoji = "💰";
                    break;
                case "apple":
                    wheel2emoji = "🍎";
                    break;
                case "black":
                    reward += 2
                    wheel2emoji = "⚫";
                    break;
                case "7":
                    wheel2emoji = "7️⃣";
                    break;
                case "change":
                    reward += 5
                    wheel2emoji = "💲";
                    break;
                case "ban":
                    wheel2emoji = "❌";
                    break;
            }switch(wheel3){
                case "cherry":
                    wheel3emoji = "🍒";
                    break;
                case "lemon":
                    wheel3emoji = "🍋";
                    break;
                case "cashbag":
                    reward += 10
                    wheel3emoji = "💰";
                    break;
                case "apple":
                    wheel3emoji = "🍎";
                    break;
                case "black":
                    reward += 2
                    wheel3emoji = "⚫";
                    break;
                case "7":
                    wheel3emoji = "7️⃣";
                    break;
                case "change":
                    reward += 5
                    wheel3emoji = "💲";
                    break;
                case "ban":
                    wheel3emoji = "❌";
                    break;
            }
        }
        vals.balance += reward * multiplier
        setvals.run(vals)

        return message.channel.send({
            embed:{
                title: "Urbu Casino | Fruit Machine",
                color: 0x3ca45c,
                description:`**|\`${wheel1emoji}\`|\`${wheel2emoji}\`|\`${wheel3emoji}\`|**\nYou won $${reward * multiplier}`
        }})
    }
}

function getfruit(){
    let fruit
    randint = Math.floor(Math.random() * 8);

    switch(randint){
        case 0:
            fruit = "cherry";
            break;
        case 1:
            fruit = "lemon";
            break;
        case 2:
            fruit = "cashbag";
            break;
        case 3:
            fruit = "apple";
            break;
        case 4:
            fruit = "black";
            break;
        case 5:
            fruit = "7";
            break;
        case 6:
            fruit = "change"
            break;
        case 7:
            fruit = "ban"
            break;
        case 8:
            fruit = "ban"
            break;
    }

    return fruit;
}