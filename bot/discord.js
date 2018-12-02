'use strict'

const logger = require('./logger')
const Discord = require('discord.js')
const client = new Discord.Client()

let guild

function findChannel(name) {
    return guild.channels.find(g => g.name === name)
}

function login(token) {

    const p = new Promise((resolve, reject) => {
        client.once('ready', () => {
            logger.info(`Logged in as ${client.user.tag}`)
            // if no guild is specified, get the first one
            if(!process.env.DISCORD_GUILD) {
                const g = client.guilds.first()
                if(!g) throw new Error('Unable to determine guild!')
                process.env.DISCORD_GUILD = g.id
            }
        
            guild = client.guilds.get(process.env.DISCORD_GUILD)
            if(!guild) {
                return reject(`unable to find guild ID ${process.env.DISCORD_GUILD}`)
            }
        
            logger.info('managing guild: %s', guild.name)
            resolve(guild)
        })
    })

    client.login(token)
    return p
}

module.exports = {
    client,
    login,
    findChannel
}