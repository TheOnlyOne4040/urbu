const Discord = require('discord.js');
const beacons = require("../../obj/beacons.js")

module.exports={
    name: 'random',
    group: 'simple',
    memberName: 'random',
    alias: ['rnd'],
    description: 'Picks a random number in a given range',
    usage: '<Lower Boundary> <Upper Boundary>',
    guildOnly: true,
    async execute(message, args)
    {
        const lower = parseInt(args[0])
        const higher = parseInt(args[1])
        const dif = higher - lower

        randint = Math.floor(Math.random() * dif)
        inrange = randint + lower

        beacons.debug(lower)
        beacons.debug(higher)
        beacons.debug(dif)
        beacons.debug(randint)
        beacons.debug(inrange)
    }
}