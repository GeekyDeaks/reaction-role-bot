'use strict'

require('dotenv').config()

const logger = require('./logger')
const discord = require('./discord')

let reportChannel
let reactionMessage


// die on any unhandled promise rejections
process.on('unhandledRejection', (reason) => { 
    throw reason 
})

async function start() {

    // check the required config
    ['DISCORD_TOKEN', 'REACTION_MSG_ID'].forEach( p => {
        if(!process.env[p]) {
            logger.error('%s not defined', p)
            process.exit(1)
        }
    })

    // set the reaction message IDs - stripping all whitepspace out of the IDs
    reactionMessage = process.env.REACTION_MSG_ID.split(',').map( c => c.replace(/ /g, ''))

    logger.info('starting bot')
    await discord.login(process.env.DISCORD_TOKEN)

    if(process.env.REPORT_CHANNEL) {
        reportChannel = discord.findChannel(process.env.REPORT_CHANNEL)
        if(!reportChannel) {
            logger.error('unable to find channel %s', process.env.REPORT_CHANNEL)
        } else {
            logger.info('setting report channel to: %s (%s)', process.env.REPORT_CHANNEL, reportChannel.id)
        }
    }

    // unfortunately, messageReactionAdd and messageReactionRemove
    // only work on cached messages
    discord.client.on('raw', rawHandler)
}

function rawHandler(event) {

    const { t, d } = event
    // only let through reactions
    if(t !== 'MESSAGE_REACTION_ADD' && t !== 'MESSAGE_REACTION_REMOVE') return

    // for a specific message
    if(!reactionMessage.find( e => e === d.message_id)) return

    logger.debug('raw: %j', {
        t: event.t,
        d: event.d
    }) 
}


module.exports = { start }
