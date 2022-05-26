'use strict'

const joi = require('joi');

const varsSchema = joi.object({
    BUILD_CONFIGURATION: joi.string()
        .valid('debug', 'release')
        .default(deploy.isDevelopment ? 'debug' : 'release'),
    BUILD_ARCHITECTURE: joi.string()
        .valid('x86', 'x64', 'arm', 'arm64')
        .default('x64')
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(build) validation error: ${error.message}`);
}

const config = {
    build: {
        configuration: {
            name: vars.BUILD_CONFIGURATION,
            isDebugBuild: vars.BUILD_CONFIGURATION === 'debug',
            isReleaseBuild: vars.BUILD_CONFIGURATION === 'release',
            isCustomBuild: vars.BUILD_CONFIGURATION != 'release' && vars.BUILD_CONFIGURATION != 'debug',
        },

        architecture: {
            name: vars.BUILD_ARCHITECTURE,
            is32Bit: vars.BUILD_ARCHITECTURE === 'x86' || vars.BUILD_ARCHITECTURE === 'arm',
            is64Bit: vars.BUILD_ARCHITECTURE === 'x64' || vars.BUILD_ARCHITECTURE === 'arm64',
        },

        platform: {
            isAMDPlatform: vars.BUILD_ARCHITECTURE === 'x86' || vars.BUILD_ARCHITECTURE === 'x64',
            isARMPlatform: vars.BUILD_ARCHITECTURE === 'arm' || vars.BUILD_ARCHITECTURE === 'arm64'
        }
    }
};

module.exports = config