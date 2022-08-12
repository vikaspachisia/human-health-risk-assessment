'use strict'
const joi = require('joi');

console.log('creating map of apps...');
const apps = new Map([  
  [
    'web',
    {
      name: 'web',
      display: 'web gateway',
      description: 'The gateway primarily servicing desktop/laptop client (form factors).',
      group: 'frontend'
    }
  ],
  [
    'mobile',
    {
      name: 'mobile',
      display: 'mobile gateway',
      description: 'The gateway primarily servicing mobile client form factors.',
      group: 'frontend'
    }
  ],
  [
    'api',
    {
      name: 'api',
      display: 'api gateway',
      description: 'The gateway primarily servicing api requests.',
      group: 'external'
    }
  ]
]);

console.log('created map of apps.');

console.log('reading process environment...');
let envVars = { ...process.env };
envVars['ALLOWED_APPS'] = JSON.parse(envVars['ALLOWED_APPS']);
envVars['BLOCKED_APPS'] = JSON.parse(envVars['BLOCKED_APPS']);
envVars['SECRET_KEYS'] = JSON.parse(envVars['SECRET_KEYS']);
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({  
  ALLOWED_APPS: joi.array().items(joi.string().required().valid(...apps.keys((k) => k)))
    .default(Array.from(apps.keys())),
  BLOCKED_APPS: joi.array().items(joi.string().valid(...apps.keys((k) => k)))
    .default([]),
  APP_GROUP: joi.string().default('client'),
  SECRET_KEYS: joi.array().items(joi.string().required())
    .default(['secure-client'])
}).unknown()
  .required();
console.log('created joi schema.');

console.log('validating data...');
const { error, value: vars } = varsSchema.validate(envVars);
if (error) {
  throw new Error(`Config(app) validation error: ${error.message}`);
}
console.log('validated data.');

console.log('creating config(app)...');
const config = {
  app: {    
    allowed: vars.ALLOWED_APPS.map(appid => [appid, apps.get(appid)]),
    blocked: vars.BLOCKED_APPS.map(appid => [appid, apps.get(appid)]),
    group: vars.APP_GROUP,
    secretkeys: vars.SECRET_KEYS
  }
};
console.log('created config(app).');

console.log(`config.app.allowed=${JSON.stringify(config.app.allowed)}`);
console.log(`config.app.blocked=${JSON.stringify(config.app.blocked)}`);

module.exports = config
