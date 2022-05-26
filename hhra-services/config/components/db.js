'use strict'

const joi = require('joi');
const build = require('build').build;

const varsSchema = joi.object({
    DB_PROVIDER:
        joi.string().required()
            .valid('mongo', 'postgresql', 'mysql')
            .default('mongo'),    
    DB_NAME:
        joi.string().required()
        .default('hhra-db'),
    DB_USERNAME:
        joi.string()
        .default(''),
    DB_PASSWORD:
        joi.string()
            .default(''),
    DB_PASSWORDHASH:
        joi.string()
            .default(''),
    DB_SCHEME:
        joi.string().required()
            .when('PROVIDER', {
                switch: [
                    { is: 'mongo', then: Joi.default('mongodb+srv') },
                    { is: 'postgresql', then: Joi.default('postgresql') },
                    { is: 'mysql', then: Joi.default('mysqlx+srv') }
                ]
            })
            .default('mongodb+srv'),
    DB_HOSTNAME:
        joi.string().hostname().required()
            .default('localhost'),
    DB_PORT:
        joi.number().required()
            .when('PROVIDER', {
                switch: [
                    { is: 'mongo', then: Joi.default(27017) },
                    { is: 'postgresql', then: Joi.default(5432) },
                    { is: 'mysql', then: Joi.default(3306) }
                ]
            })
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(db) validation error: ${error.message}`);
}

const config = {
    db: {        
        scheme: vars.DB_SCHEME,
        hostname: vars.DB_HOSTNAME,
        port: build.isDebugBuild ? vars.DB_PORT + 1 : vars.DB_PORT,
        name: vars.DB_NAME,
        username: vars.DB_USERNAME,
        password: vars.DB_PASSWORDHASH != '' ? vars.DB_PASSWORDHASH : vars.DB_PASSWORD
    }
};

module.exports = config