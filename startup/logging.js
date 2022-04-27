require('express-async-errors');
const winston = require('winston');

let logger = winston.createLogger({
    silent: false,
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'log/combined.log', options: { flags: 'w' } })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'log/exceptions.log', options: { flags: 'w' } }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        name: 'console.info',
        colorize: true,
        prettyPrint: true,
        showLevel: true
    }));
}
winston.add(logger);
module.exports = logger;