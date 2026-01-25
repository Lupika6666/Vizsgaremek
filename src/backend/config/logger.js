const winston = require('winston');
const path = require('path');

// Create the logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({ 
            filename: path.join(__dirname, '../logs/error.log'), 
            level: 'warn'
        }),
        new winston.transports.File({ 
            filename: path.join(__dirname, '../logs/combined.log')
        })
    ]
});

// Stream for Morgan
logger.stream = {
    write: (message) => {
        const match = message.match(/\s(\d{3})\s/);
        const status = match ? parseInt(match[1]) : 200;
        
        if (status >= 500) {
            logger.error(message.trim());
        } else if (status >= 400) {
            logger.warn(message.trim());
        } else {
            logger.info(message.trim());
        }
    }
};

module.exports = logger;
