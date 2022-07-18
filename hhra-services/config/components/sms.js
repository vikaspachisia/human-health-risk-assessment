'use strict'

const joi = require('joi');

console.log('reading process environment...');
let envVars = { ...process.env };
envVars['SMS_PORTS'] = JSON.parse(envVars['SMS_PORTS']);
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({
  SMS_PROVIDER:
    joi.string().required()
      .valid('aws', 'azure', 'gcp')
      .default('aws'),
  SMS_NAME:
    joi.string().required()
      .default('hhra-services-sms-all'),
  SMS_USERNAME:
    joi.string()
      .default(''),
  SMS_PASSWORD:
    joi.string()
      .default(''),
  SMS_PASSWORDHASH:
    joi.string()
      .default(''),
  SMS_SECURE: joi.bool().required()
    .default(true),
  SMS_HOSTNAME:
    joi.string().hostname().required()
      .default('localhost'),
  SMS_PORTS:
    joi.array().items(joi.number().required())
      .when('SMS_SECURE', {
        is: true, then: joi.default([465, 25]), otherwise: joi.default([25, 465])
      })
}).unknown()
  .required();
console.log('created joi schema.');

console.log('validating data...');
const { error, value: vars } = varsSchema.validate(envVars);
if (error) {
  throw new Error(`Config(sms) validation error: ${error.message}`);
}
console.log('validated data.');

console.log('creating config(sms)...');
const config = {
  sms: {
    provider: vars.SMS_PROVIDER,
    name: vars.SMS_NAME,
    username: vars.SMS_USERNAME,
    password: vars.SMS_PASSWORDHASH != '' ? vars.SMS_PASSWORDHASH : vars.SMS_PASSWORD,
    secure: vars.SMS_SECURE,
    hostname: vars.SMS_HOSTNAME,
    ports: vars.SMS_PORTS
  }
};
console.log('created config(sms).');

module.exports = config
