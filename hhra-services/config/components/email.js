'use strict'

const joi = require('joi');
const envConfig = require('environment')

const varsSchema = joi.object({
    EMAILPROVIDER:
        joi.string().required()
            .valid('mongo', 'postgresql', 'mysql')
            .default('mongo'),
    DBNAME:
        joi.string().required()
            .default('hhra-db'),
    DBUSERNAME:
        joi.string()
            .default(''),
    DBPASSWORD:
        joi.string()
            .default(''),
    DBPASSWORDHASH:
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
    email: {
        scheme: vars.SCHEME,
        hostname: vars.HOSTNAME,
        port: envConfig.env.isDebugBuild ? vars.PORT + 1 : vars.PORT,
        dbname: vars.DBNAME,
        dbusername: vars.DBUSERNAME,
        dbpassword: vars.DBPASSWORDHASH != '' ? vars.DBPASSWORDHASH : vars.DBPASSWORD
    }
};

module.exports = config