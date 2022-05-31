'use strict'

const joi = require('joi');
const build = require('build').build;

const server_contexts = [
    { name: 'gateway', path: '/', router: 'gateway' }    
];

const servers = [
    { name: 'web', path: '/web', router: 'web' },
    { name: 'mobile', path: '/mobile', router: 'mobile' },
    { name: 'api', path: '/api', router: 'api' }    
];

const server_hosts = [
    { context: 'gateway', server: 'web', hostname: 'localhost', port: 4040 },
    { context: 'gateway', server: 'mobile', hostname: 'localhost', port: 4042 },
    { context: 'gateway', server: 'api', hostname: 'localhost', port: 4044 }    
];

const varsSchema = joi.object({
    SERVER_CONTEXT: joi.string()
        .valid(server_contexts['*.name']),
    SERVER: joi.string()
        .valid(servers['*.name']),
    HOSTNAME: joi.string().hostname().required()
        .default(server_hosts['context=${SERVER_CONTEXT}, server=${SERVER}'].hostname),
    PORT: joi.number().required()
        .default(server_hosts['context=${SERVER_CONTEXT}, server=${SERVER}'].port)
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(server) validation error: ${error.message}`);
}

const config = {
    server: {
        hostname: vars.HOSTNAME,
        port: build.isDebugBuild ? vars.PORT + 1 : vars.PORT
    }
};

module.exports = config