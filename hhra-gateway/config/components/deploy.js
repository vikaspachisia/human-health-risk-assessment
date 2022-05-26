'use strict'

const joi = require('joi');
const product = require('product').product

const varsSchema = joi.object({
    DEPLOYMENT_ENV: joi.string()
        .valid('development', 'stage', 'production')
        .default('development'),
    DEPLOYMENT_SRV_HOSTNAME: joi.string().hostname()
        .default(product.defaultHostname),
    DEPLOYMENT_SRV_PORT: joi.number()
        .default(product.defaultPort)
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(deploy) validation error: ${error.message}`);
}

const config = {
    deploy: {
        env: {
            name: vars.DEPLOYMENT_ENV,
            isDevelopment: vars.DEPLOYMENT_ENV === 'development',
            isStage: vars.DEPLOYMENT_ENV === 'stage',
            isProduction: vars.DEPLOYMENT_ENV === 'production'
        },
        hostname: vars.DEPLOYMENT_SRV_HOSTNAME,
        port: vars.DEPLOYMENT_SRV_PORT        
    }
};

module.exports = config