'use strict'

const joi = require('joi');


console.log('creating map of frontends...');
const frontends = new Map([
  [
    'web',
    {
      id: 'frontend.api.web',
      name: 'web client frontend',
      description: 'The web client primarily interacting with users through browsers. Mostly runs on desktop/laptop form factors.',
      SESSION_NAME: 'session.api.web',
      SESSION_SECRET: 'websession'
    }
  ],
  [
    'mobile',
    {
      id: 'frontend.api.mobile',
      name: 'mobile app frontend',
      description: 'The mobile client primarily interacting with users through apps. Mostly runs on mobile form factors.',
      SESSION_NAME: 'session.api.mobile',
      SESSION_SECRET: 'mobilesession'
    }
  ],
  [
    'public',
    {
      id: 'frontend.api.public',
      name: 'public api frontend',
      description: 'The public client primarily interacting with users through api calls. Mostly runs in non interactive mode from other servers and SDK.',
      SESSION_NAME: 'session.api.public',
      SESSION_SECRET: 'publicsession'
    }
  ]
]);

console.log('created map of frontends.');

console.log('reading process environment...');
let envVars = { ...process.env };
if ('FRONTENDS' in envVars) { envVars['FRONTENDS'] = JSON.parse(envVars['FRONTENDS']); }
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({
  FRONTENDS: joi.array().items({
    ID: joi.string().required().valid(...frontends.keys((k) => k)),
    NAME: joi.string().default(frontends.get(joi.ref('ID')).name),
    DESCRIPTION: joi.string().default(frontends.get(joi.ref('ID')).description),
    SESSION_NAME: joi.string().default(frontends.get(joi.ref('ID')).SESSION_NAME),
    SESSION_SECRET: joi.string().default(frontends.get(joi.ref('ID')).SESSION_SECRET)
  })
}).unknown()
  .required();
console.log('created joi schema.');


console.log('validating data...');
const { error, value: vars } = varsSchema.validate(envVars);
if (error) {
  throw new Error(`Config(frontend support) validation error: ${error.message}`);
}
console.log('validated data.');

console.log('creating config(frontend support)...');
const config = {
  frontends: {
    groups: vars.FRONTEND_GROUPS
  }  
};
console.log('created config(frontend support).');

module.exports = config
