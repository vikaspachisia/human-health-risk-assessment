'use strict'

const joi = require('joi');

const varsSchema = joi.object({
    NODE_ENV: joi.string()
        .valid('development', 'staging', 'production')
        .required()
        .default('development'),
    NODE_HOSTNAME: joi.string().hostname()
        .required()
        .default("localhost"),
    NODE_PORT: joi.number()
        .required()
        .default(4040)
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(deploy) validation error: ${error.message}`);
}

const config = {
    deploy: {
        env: {
            name: vars.NODE_ENV,
            isDevelopment: vars.NODE_ENV === 'development',
            isStaging: vars.NODE_ENV === 'stage',
            isProduction: vars.NODE_ENV === 'production'
        },
        hostname: vars.NODE_HOSTNAME,
        port: vars.NODE_PORT
    }
};

module.exports = config