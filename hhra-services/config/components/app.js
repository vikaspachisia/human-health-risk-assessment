'use strict'
const joi = require('joi');

console.log('creating map of apps...');
const apps = new Map([
  [
    'account',
    {
      name: 'account',
      display: 'account service',
      description: 'provide account related service requests such as user account servicing, device account servicing etc.',
      group: 'persona'
    }
  ],

  [
    'profile',
    {
      name: 'profile',
      display: 'profile service',
      description: 'provide profile related service requests such as user profile servicing, device profile servicing etc.',
      group: 'persona'
    }
  ],

  [
    'authentication',
    {
      name: 'authentication',
      display: 'authentication services',
      description: 'provide auth related service requests such as user authentication servicing, device authentication servicing etc.',
      group: 'aaa'
    }
  ],

  [
    'authorization',
    {
      name: 'authorization',
      display: 'authorization services',
      description: 'provide auth related service requests such as user authorization servicing, device authorization servicing etc.',
      group: 'aaa'
    }
  ],

  [
    'audit',
    {
      name: 'audit',
      display: 'audit services',
      description: 'provide audit or log related service requests.',
      group: 'aaa'
    }
  ],

  [
    'metadata',
    {
      name: 'metadata',
      display: 'metadata services',
      description: 'provide metadata related service requests such as attributes of data used in a particular domain.',
      group: 'domain'
    }
  ],

  [
    'domaindata',
    {
      name: 'domaindata',
      display: 'domaindata services',
      description: 'provide domain data related service requests used in a particular domain.',
      group: 'domain'
    }
  ],

  [
    'chat',
    {
      name: 'chat',
      display: 'chat services',
      description: 'provide communication related service requests especially chat in this case.',
      group: 'interaction'
    }
  ],

  [
    'sms',
    {
      name: 'sms',
      display: 'sms services',
      description: 'provide communication related service requests such as sending SMS.',
      group: 'interaction'
    }
  ],

  [
    'call',
    {
      name: 'call',
      display: 'call services',
      description: 'provide communication related service requests such as making phone calls.',
      group: 'interaction'
    }
  ]
]);
console.log('created map of apps.');

//optimize the entire cast design in next iteration
console.log('reading process environment...');
let envVars = { ...process.env };
if ('ALLOWED_APPS' in envVars) { envVars['ALLOWED_APPS'] = JSON.parse(envVars['ALLOWED_APPS']); }
if ('BLOCKED_APPS' in envVars) { envVars['BLOCKED_APPS'] = JSON.parse(envVars['BLOCKED_APPS']); }
if ('SECRET_KEYS' in envVars) { envVars['SECRET_KEYS'] = JSON.parse(envVars['SECRET_KEYS']); }
if ('EMAIL_PORTS' in envVars) { envVars['EMAIL_PORTS'] = JSON.parse(envVars['EMAIL_PORTS']); }
if ('SMS_PORTS' in envVars) { envVars['SMS_PORTS'] = JSON.parse(envVars['SMS_PORTS']); }
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({  
  ALLOWED_APPS: joi.array().items(joi.string().required().valid(...apps.keys((k) => k)))
    .default(Array.from(apps.keys())),
  BLOCKED_APPS: joi.array().items(joi.string().valid(...apps.keys((k) => k)))
    .default([]),
  APP_GROUP: joi.string().default('default'),
  SECRET_KEYS: joi.array().items(joi.string().required())
    .default(['secure-services'])
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
