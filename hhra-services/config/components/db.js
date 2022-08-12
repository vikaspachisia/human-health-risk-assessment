'use strict'

const joi = require('joi');
const buildConfig = require('./build');

console.log('reading process environment...');
let envVars = { ...process.env };
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({
    DB_PROVIDER:
        joi.string().required()
            .valid('mongo', 'postgresql', 'mysql')
            .default('mongo'),    
    DB_NAME:
        joi.string().required()
        .default('hhra'),
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
        joi.string()
            .when('DB_PROVIDER', {
                switch: [
                    { is: 'mongo', then: 'mongodb+srv' },
                    { is: 'postgresql', then: 'postgresql' },
                    { is: 'mysql', then: 'mysqlx+srv' }
                ]
            })
            .default('mongodb+srv'),
    DB_HOSTNAME:
        joi.string().hostname()
            .default('localhost'),
    DB_PORT:
        joi.number()
            .when('DB_PROVIDER', {
                switch: [
                    { is: 'mongo', then: 27017 },
                    { is: 'postgresql', then: 5432 },
                    { is: 'mysql', then: 3306 }
                ]
            })
}).unknown()
    .required();
console.log('created joi schema.');

console.log('validating data...');
const { error, value: vars } = varsSchema.validate(envVars);
if (error) {
    throw new Error(`Config(db) validation error: ${error.message}`);
}
console.log('validated data.');

console.log('creating config(db)...');
const config = {
    db: {        
        scheme: vars.DB_SCHEME,
        hostname: vars.DB_HOSTNAME,
        port: buildConfig.build.isDebugBuild ? vars.DB_PORT + 1 : vars.DB_PORT,
        name: vars.DB_NAME,
        username: vars.DB_USERNAME,
        password: vars.DB_PASSWORDHASH != '' ? vars.DB_PASSWORDHASH : vars.DB_PASSWORD
    }
};
console.log('created config(db).');

module.exports = config
