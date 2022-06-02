'use strict'

const apps = [
    [
        'monolith',
        {
            type: 'Monolith Gateway',
            description: 'The gateway servicing all form factors (web, mobile, api...).'
        }
    ],
    [
        'web',
        {
            type: 'Web Gateway',
            description: 'The gateway primarily servicing desktop/laptop form factors.'
        }
    ],
    [
        'mobile',
        {
            type: 'Mobile Gateway',
            description: 'The gateway primarily servicing mobile form factors.'            
        }
    ],
    [
        'api',
        {
            type: 'API Gateway',
            description: 'The gateway primarily servicing api requests.'
        }
    ]
];

const joi = require('joi');

const varsSchema = joi.object({
    name: joi.string()
        .valid(apps.map((key, value) => {key}))
        .default(apps[0].key),
    SESSION_SECRET: joi.array.items(joi.string().required())
        .required()
        .default([joi.ref('name')])
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(context) validation error: ${error.message}`);
}

const config = {
    app : {
        name: vars.name,
        type: apps[vars.name].type,
        description: contexts[vars.name].description,
        session_secret: vars.SESSION_SECRET
    }
};

module.exports = config