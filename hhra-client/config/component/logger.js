'use strict'

const joi = require('joi');
const deploy = require('deploy').deploy;

const envVarsSchema = joi.object({
    LOGGER_LEVEL: joi.string()
        .valid('error', 'warn', 'info', 'verbose', 'debug')
        .default(deploy.isDevelopment ? 'verbose' : 'info'),
    LOGGER_ENABLED: joi.boolean()
        .truthy('true')
        .falsy('false')
        .default(true)
}).unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(logger) validation error: ${error.message}`);
}

const config = {
    logger: {
        level: envVars.LOGGER_LEVEL,
        enabled: envVars.LOGGER_ENABLED
    }
};

module.exports = config