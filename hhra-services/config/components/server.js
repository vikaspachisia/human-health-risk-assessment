'use strict'

const joi = require('joi');
const envConfig = require('environment')

const varsSchema = joi.object({
    HOSTNAME: joi.string().hostname().required()
        .default(constants.servers[0].hostname),
    PORT: joi.number()
        .valid(constants.servers.map((server) => { server.port }))
        .default(constants.servers[0].port)
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(server) validation error: ${error.message}`);
}

const config = {
    server: {
        hostname: vars.HOSTNAME,
        port: envConfig.env.isDebugBuild ? vars.PORT + 1 : vars.PORT
    }
};

module.exports = config