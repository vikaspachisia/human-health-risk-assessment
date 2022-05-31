const config = require('../config/index');
const winston = require('winston');

const logAuditFilepath = 'logs/gateway.log';
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    winston.format.align(),
    winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
);

const LoggerUtil = class loggerUtil {
    getLogger = () => {
        return new winston.createLogger({
            silent: config.logger.enabled,
            transports: [
                new winston.transports.Console({
                    level: config.logger.level
                }),
                new winston.transports.File({
                    level: config.logger.level,
                    filename: logAuditFilepath,
                    format: logFormat
                })
            ]
        });
    };

    getConsoleLogger = () => {
        return new winston.createLogger({
            silent: config.logger.enabled,
            transports: [
                new winston.transports.Console({
                    level: config.logger.level
                })
            ]
        });
    };

    getAuditLogger = () => {
        return new winston.createLogger({
            silent: config.logger.enabled,
            transports: [
                new winston.transports.File({
                    level: config.logger.level,
                    filename: logAuditFilepath,
                    format: logFormat
                })
            ]
        });
    };
};

const utils = {
    loggerUtil: new LoggerUtil()
};

module.exports = utils;