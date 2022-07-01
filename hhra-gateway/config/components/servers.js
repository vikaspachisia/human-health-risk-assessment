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
  SERVERS: joi.string().required()
        .default(JSON.stringify(servers))
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(servers) validation error: ${error.message}`);
}

const serverSchema = joi.object({
  SERVERS: joi.array().items(
    joi.object({
      name: joi.string().required(),
      hostname: joi.string().hostname().required(),
      port: joi.number().required()
    })
  )
}).unknown()
  .required();

const { errorServer, value: varsServer } = serverSchema.validate(JSON.parse(vars.SERVERS));
if (errorServer) {
  throw new Error(`Config(servers) server validation error: ${errorServer.message}`);
}

const config = {
  servers: varsServer.SERVERS
};

module.exports = config
