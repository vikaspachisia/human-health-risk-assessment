'use strict'

const joi = require('joi');

console.log('reading process environment...');
let envVars = { ...process.env };
if ('EMAIL_PORTS' in envVars) { envVars['EMAIL_PORTS'] = JSON.parse(envVars['EMAIL_PORTS']); }
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({
  EMAIL_PROVIDER:
    joi.string().required()
      .valid('aws', 'azure', 'gcp')
      .default('aws'),
  EMAIL_NAME:
    joi.string().required()
      .default('hhra-email'),
  EMAIL_USERNAME:
    joi.string()
      .default(''),
  EMAIL_PASSWORD:
    joi.string()
      .default(''),
  EMAIL_PASSWORDHASH:
    joi.string()
      .default(''),
  EMAIL_SECURE: joi.bool().required()
    .default(true),
  EMAIL_HOSTNAME:
    joi.string().hostname().required()
      .default('localhost'),
  EMAIL_PORTS:
    joi.array().items(joi.number().required())
      .default((parent) => parent.EMAIL_SECURE == true ? [465, 25] : [25, 465])      
}).unknown()
  .required();
console.log('created joi schema.');

console.log('validating data...');
const { error, value: vars } = varsSchema.validate(envVars);
if (error) {
    throw new Error(`Config(email) validation error: ${error.message}`);
}
console.log('validated data.');

console.log('creating config(email)...');
const config = {
  email: {
    provider: vars.EMAIL_PROVIDER,
    name: vars.EMAIL_NAME,
    username: vars.EMAIL_USERNAME,
    password: vars.EMAIL_PASSWORDHASH != '' ? vars.EMAIL_PASSWORDHASH : vars.EMAIL_PASSWORD,
    secure: vars.EMAIL_SECURE,
    hostname: vars.EMAIL_HOSTNAME,
    ports: vars.EMAIL_PORTS
  }
};
console.log('created config(email).');

module.exports = config
