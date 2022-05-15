'use strict'

const joi = require('joi');

const varsSchema = joi.object({
    DEPLOYMENT_ENV: joi.string()
        .valid('development', 'stage', 'production')
        .default('development'),
    BUILD_CONFIGURATION: joi.string()
        .valid('debug', 'release')
        .default('debug'),
    BUILD_ARCHITECTURE: joi.string()
        .valid('x86', 'x64', 'arm')
        .default('x64')
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(environment) validation error: ${error.message}`);
}

const config = {
    env: {
        deploymentEnvironment: vars.DEPLOYMENT_ENV,
        isDevelopment: vars.DEPLOYMENT_ENV === 'development',
        isStage: vars.DEPLOYMENT_ENV === 'stage',
        isProduction: vars.DEPLOYMENT_ENV === 'production',

        buildConfiguration: vars.BUILD_CONFIGURATION,
        isDebugBuild: vars.BUILD_CONFIGURATION === 'debug',
        isReleaseBuild: vars.BUILD_CONFIGURATION === 'release',
        buildArchitecture: vars.BUILD_ARCHITECTURE
    }
};

module.exports = config