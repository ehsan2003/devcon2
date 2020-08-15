import winston, {format} from 'winston';

const logger = winston.createLogger({
    level: 'silly',
    format: format.combine(winston.format.json(), winston.format.timestamp()),
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.printf(
                ({level, message, timestamp}) => `${timestamp} ${level} ${message}`
            )
        )
    }));
}
export default logger;