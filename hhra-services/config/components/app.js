'use strict'
const joi = require('joi');

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
  ]

  [
  'chat',
  {
    name: 'chat services',
    description: 'provide communication related service requests especially chat in this case.',
    group: 'app-group-3'
  }
  ]

  [
  'phone',
  {
    name: 'phone services',
    description: 'provide communication related service requests such as sending SMS or making phone calls.',
    group: 'app-group-3'
  }
  ]
]);

const varsSchema = joi.object({
  ALLOW_APPS: joi.array().items(joi.string().required())
    .has(joi.string().valid(...apps.keys((k) => k))),
  BLOCK_APPS: joi.array().items(joi.string())
    .has(joi.string().valid(...apps.keys((k) => k))),
  SECRET_KEYS: joi.array().items(joi.string().required())
    .default(['hhra-services'])
}).unknown()
  .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
  throw new Error(`Config(app) validation error: ${error.message}`);
}

const config = {
  app: {
    allowed: vars.ALLOW_APPS.map(appid => [appid, apps[appid]]),
    blocked: vars.BLOCK_APPS.map(appid => [appid, apps[appid]]),
    session_secret: vars.SECRET_KEYS
  }
};

module.exports = config
