'use strict'

const joi = require('joi');
const build = require('build').build;

const varsSchema = joi.object({
    EMAIL_PROVIDER:
        joi.string().required()
            .valid('aws', 'azure', 'gcp')
            .default('aws'),
    EMAIL_NAME:
        joi.string().required()
            .default('hhra-email'),
    EMAIL_USERNAME:
        joi.string()
            .default(''),
    EMAIL_PASSWORD:
        joi.string()
            .default(''),
    EMAIL_PASSWORDHASH:
        joi.string()
            .default(''),
    EMAIL_SCHEME:
        joi.string().required()
            .when('PROVIDER', {
                switch: [
                    { is: 'aws', then: Joi.default('mongodb+srv') },
                    { is: 'azure', then: Joi.default('postgresql') },
                    { is: 'gcp', then: Joi.default('mysqlx+srv') }
                ]
            })
            .default('mongodb+srv'),
    EMAIL_HOSTNAME:
        joi.string().hostname().required()
            .default('localhost'),
    EMAIL_PORT:
        joi.number().required()
            .when('PROVIDER', {
                switch: [
                    { is: 'aws', then: Joi.default(27017) },
                    { is: 'azure', then: Joi.default(5432) },
                    { is: 'gcp', then: Joi.default(3306) }
                ]
            })
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(db) validation error: ${error.message}`);
}

const config = {
    email: {
        scheme: vars.EMAIL_SCHEME,
        hostname: vars.EMAIL_HOSTNAME,
        port: build.isDebugBuild ? vars.PORT + 1 : vars.PORT,
        name: vars.EMAIL_NAME,
        username: vars.EMAIL_USERNAME,
        password: vars.EMAIL_PASSWORDHASH != '' ? vars.EMAIL_PASSWORDHASH : vars.EMAIL_PASSWORD
    }
};

module.exports = config