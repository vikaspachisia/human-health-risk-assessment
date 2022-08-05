'use strict'
const joi = require('joi');

console.log('creating map of apps...');
const apps = new Map([
  [
    'account',
    {
      name: 'account service',
      description: 'provide account related service requests such as user account servicing, device account servicing etc.',
      group: 'app-group-1'
    }
  ],

  [
    'profile',
    {
      name: 'profile service',
      description: 'provide profile related service requests such as user profile servicing, device profile servicing etc.',
      group: 'app-group-1'
    }
  ],

  [
    'aaa',
    {
      name: 'auth services',
      description: 'provide auth related service requests such as user authentication servicing, user authorization servicing, device authentication servicing etc.',
      group: 'app-group-1'
    }
  ],

  [
    'log',
    {
      name: 'log services',
      description: 'provide log related service requests such as request logging, service auditing etc.',
      group: 'app-group-2'
    }
  ],

  [
    'report',
    {
      name: 'report services',
      description: 'provide report related service requests such as tabular data, grouped data etc. especially for viewing purposes.',
      group: 'app-group-2'
    }
  ],

  [
    'chat',
    {
      name: 'chat services',
      description: 'provide communication related service requests especially chat in this case.',
      group: 'app-group-3'
    }
  ],

  [
    'phone',
    {
      name: 'phone services',
      description: 'provide communication related service requests such as sending SMS or making phone calls.',
      group: 'app-group-3'
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
  APP_NAME: joi.string().default('hhra-services-group-all'),
  ALLOWED_APPS: joi.array().items(joi.string().required().valid(...apps.keys((k) => k)))
    .default(Array.from(apps.keys())),
  BLOCKED_APPS: joi.array().items(joi.string().valid(...apps.keys((k) => k)))
  .default([]),
  SECRET_KEYS: joi.array().items(joi.string().required())
    .default(['hhra-services-group-all'])
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
    name: vars.APP_NAME,
    allowed: vars.ALLOWED_APPS.map(appid => [appid, apps.get(appid)]),
    blocked: vars.BLOCKED_APPS.map(appid => [appid, apps.get(appid)]),
    secretkeys: vars.SECRET_KEYS
  }
};
console.log('created config(app).');

console.log(`config.app.allowed=${JSON.stringify(config.app.allowed)}`);
console.log(`config.app.blocked=${JSON.stringify(config.app.blocked)}`);
console.log(`config.app.secretkeys=${JSON.stringify(config.app.secretkeys)}`);

module.exports = config
