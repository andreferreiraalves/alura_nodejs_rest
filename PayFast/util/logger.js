var winston = require('winston');

module.exports = new winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({
            filename: 'logs/payfast.log', level: 'info', maxsize: 10000,
            maxFiles: 10
        })
    ]
});

// logger.log('info', 'log utilizando windows');
// logger.info('ronaldo');