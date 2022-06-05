'use strict'
const joi = require('joi');

const apps = new Map([
    [
        'monolith',
        {
            name: 'monolith gateway',
            description: 'The gateway servicing all form factors (web, mobile, api...).'
        }
    ],
    [
        'web',
        {
            name: 'web gateway',
            description: 'The gateway primarily servicing desktop/laptop form factors.'
        }
    ],
    [
        'mobile',
        {
            name: 'mobile gateway',
            description: 'The gateway primarily servicing mobile form factors.'            
        }
    ],
    [
        'api',
        {
            name: 'api gateway',
            description: 'The gateway primarily servicing api requests.'
        }
    ]
]);

const varsSchema = joi.object({
    APPID: joi.string()
        .valid(...apps.keys((k) => k))
        .default(apps.keys().next().value),
    SESSION_SECRET: joi.array().items(joi.string().required())
        .default(joi.array().unique().items(joi.ref('APPID')))
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(app) validation error: ${error.message}`);
}

const config = {
    app: {
        id: vars.APPID,
        name: apps.get(vars.APPID).name,
        description: apps.get(vars.APPID).description,
        session_secret: vars.SESSION_SECRET
    }
};

module.exports = config