'use strict'

const joi = require('joi');
const envConfig = require('environment')

const varsSchema = joi.object({
    PROVIDER:
        joi.string().required()
            .valid('mongo', 'postgresql', 'mysql')
            .default('mongo'),    
    NAME:
        joi.string().required()
        .default('hhra-db'),
    USERNAME:
        joi.string()
        .default(''),
    PASSWORD:
        joi.string()
            .default(''),
    PASSWORDHASH:
        joi.string()
            .default(''),
    SCHEME:
        joi.string().required()
            .default('mongodb+srv'),
    HOSTNAME:
        joi.string().hostname().required()
            .default('localhost'),
    PORT:
        joi.number().required()
            .default(27017)
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(db) validation error: ${error.message}`);
}

const config = {
    db: {        
        scheme: vars.SCHEME,
        hostname: vars.HOSTNAME,
        port: envConfig.env.isDebugBuild ? vars.PORT + 1 : vars.PORT,
        name: vars.NAME,
        username: vars.USERNAME,
        password: vars.PASSWORDHASH != '' ? vars.PASSWORDHASH : vars.PASSWORD
    }
};

module.exports = config