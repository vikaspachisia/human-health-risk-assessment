'use strict'

const joi = require('joi');
const build = require('build').build;

const server_contexts = [
    { name: 'user', path: '/user', router: 'user' },
    { name: 'device', path: '/device', router: 'device' },
    { name: 'analytics', path: '/analytics', router: 'analytics' },
    { name: 'interaction', path: '/interaction', router: 'interaction' },
    { name: 'notification', path: '/notification', router: 'notification' }
];

const servers = [
    { name: 'account', path: '/account', router: 'account' },
    { name: 'profile', path: '/profile', router: 'profile' },
    { name: 'auth', path: '/auth', router: 'auth' },
    { name: 'audit', path: '/audit', router: 'audit' },
    { name: 'log', path: '/log', router: 'log' },
    { name: 'telemetry', path: '/telemetry', router: 'telemetry' },
    { name: 'report', path: '/report', router: 'report' },
    { name: 'chat', path: '/chat', router: 'chat' },
    { name: 'phone', path: '/phone', router: 'phone' }
];

const server_hosts = [
    { context: 'user', server: 'account', hostname: 'localhost', port: 4040 },
    { context: 'user', server: 'profile', hostname: 'localhost', port: 4042 },
    { context: 'user', server: 'auth', hostname: 'localhost', port: 4044 },
    { context: 'device', server: 'account', hostname: 'localhost', port: 4046 },
    { context: 'device', server: 'profile', hostname: 'localhost', port: 4048 },
    { context: 'device', server: 'auth', hostname: 'localhost', port: 5050 },
    { context: 'analytics', server: 'audit', hostname: 'localhost', port: 5052 },
    { context: 'analytics', server: 'log', hostname: 'localhost', port: 5054 },
    { context: 'analytics', server: 'telemetry', hostname: 'localhost', port: 5056 },
    { context: 'analytics', server: 'report', hostname: 'localhost', port: 5058 },
    { context: 'interaction', server: 'chat', hostname: 'localhost', port: 6060 },
    { context: 'notification', server: 'phone', hostname: 'localhost', port: 6062 }
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