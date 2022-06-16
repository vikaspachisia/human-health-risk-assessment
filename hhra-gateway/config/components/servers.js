'use strict'

const joi = require('joi');

const servers = [
        { name: 'account', hostname: 'localhost', port: 4040 },
        { name: 'profile', hostname: 'localhost', port: 4040 },
        { name: 'aaa', hostname: 'localhost', port: 4040 },
        { name: 'log', hostname: 'localhost', port: 4040 },
        { name: 'report', hostname: 'localhost', port: 4040 },
        { name: 'chat', hostname: 'localhost', port: 4040 },
        { name: 'phone', hostname: 'localhost', port: 4040 }    
];

const varsSchema = joi.object({
    SERVERS: joi.array().items(
        joi.object({
            name: joi.string().required(),
            hostname: joi.string().hostname().required(),
            port: joi.number().required()
        })
    )
        .default(servers)
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(servers) validation error: ${error.message}`);
}

const config = {
    servers: vars.servers
};

module.exports = config