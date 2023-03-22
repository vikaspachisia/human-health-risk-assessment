'use strict'
const joi = require('joi');

console.log('configuring apps...');

console.log('creating map of apps...');
const apps = new Map([  
  [
    'web',
    {
      id: 'gateway.api.web',
      name: 'web api gateway',      
      description: 'The gateway primarily servicing desktop/laptop client (form factors).',
      hostname: 'localhost',
      port: 4000,
      frontends: ['frontend.api.web'],
      backends:[]
    }
  ],
  [
    'mobile',
    {
      id: 'gateway.api.mobile',
      name: 'mobile api gateway',
      description: 'The gateway primarily servicing mobile client form factors.',
      hostname: 'localhost',
      port: 4002,
      frontends: ['frontend.api.mobile'],
      backends: []
    }
  ],
  [
    'public',
    {
      id: 'gateway.api.public',
      name: 'public api gateway',      
      description: 'The gateway primarily servicing api requests from third party, SDKs and the likes.',
      hostname: 'localhost',
      port: 4004,
      frontends: ['frontend.api.public'],
      backends: []
    }
  ]
]);

console.log('created map of apps.');

console.log('reading process environment...');

let envVars = { ...process.env };
if ('FRONTENDS' in envVars) { envVars['FRONTENDS'] = JSON.parse(envVars['FRONTENDS']); }
if ('BACKENDS' in envVars) { envVars['BACKENDS'] = JSON.parse(envVars['BACKENDS']); }

console.log('read process environment.');

let currentAppGroup = apps.get('web');

console.log('creating joi schema...');
const varsSchema = joi.object({  
  APP_GROUP: joi.string().required().valid(...apps.keys((k) => k))
    .default(apps.keys().next().value),
  FRONTENDS: joi.array().items(joi.string().required().valid(...currentAppGroup.frontends))
    .default(Array.from(currentAppGroup.frontends)),
  BACKENDS: joi.array().items(joi.string().required().valid(...currentAppGroup.backends))
    .default(Array.from(currentAppGroup.backends)),
  HOSTNAME: joi.string().hostname()
    .default(currentAppGroup.hostname),
  PORT: joi.number()
    .default(currentAppGroup.port)
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
    group: vars.APP_GROUP,
    frontends: vars.FRONTENDS,
    backends: vars.BACKENDS,
    hostname: vars.HOSTNAME,
    port: vars.PORT
  }
};
console.log('created config(app).');

console.log(`config.app.frontends=${JSON.stringify(config.app.frontends)}`);
console.log(`config.app.backends=${JSON.stringify(config.app.backends)}`);

module.exports = config

console.log('configured apps.');
