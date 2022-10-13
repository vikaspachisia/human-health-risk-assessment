'use strict'

const joi = require('joi');

console.log('creating map of frontends...');
const frontends = [
  {
    group: 'interactive',
    description: "represents clients such as web and mobile that may have interactive conversations.",
    hostname: 'localhost',
    port: 3000
  },
  {
    group: 'public',
    description: "represents clients such as third party sdk, libraries or APIs' such as RESTful and HTTP.",
    hostname: 'localhost',
    port: 3002
  },

];
console.log('created map of frontends.');

console.log('reading process environment...');
let envVars = { ...process.env };
if ('FRONTEND_GROUPS' in envVars) { envVars['FRONTEND_GROUPS'] = JSON.parse(envVars['FRONTEND_GROUPS']); }
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({
  FRONTEND_GROUPS: joi.array().items(joi.object({
    group: joi.string().required(),
    description: joi.string().required(),
    hostname: joi.string(),
    port: joi.number()
  }))
    .default(frontend_groups),
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
