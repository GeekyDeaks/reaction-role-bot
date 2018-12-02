'use strict'
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, splat, colorize, printf } = format

const logger = createLogger({
    format: combine(
        colorize(),
        splat(),
        timestamp(),
        printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new transports.Console({
        handleExceptions: true,
        level: process.env.LOG_LEVEL || 'info' 
    })]
})

module.exports = logger