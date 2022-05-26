'use strict'

const joi = require('joi');

const varsSchema = joi.object({
    DEPLOYMENT_ENV: joi.string()
        .valid('development', 'stage', 'production')
        .default('development')
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(deploy) validation error: ${error.message}`);
}

const config = {
    deploy: {
        deploymentEnvironment: vars.DEPLOYMENT_ENV,
        isDevelopment: vars.DEPLOYMENT_ENV === 'development',
        isStage: vars.DEPLOYMENT_ENV === 'stage',
        isProduction: vars.DEPLOYMENT_ENV === 'production'
    }
};

module.exports = configconsole.log("Hello World!")