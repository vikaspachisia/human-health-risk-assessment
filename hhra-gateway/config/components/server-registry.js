'use strict'

const joi = require('joi');

const config = {
    registry: {
        server_registry: [
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
        ]
    }
};

module.exports = config