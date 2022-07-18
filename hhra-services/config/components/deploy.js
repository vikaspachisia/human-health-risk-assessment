'use strict'

const joi = require('joi');

console.log('reading process environment...');
let envVars = { ...process.env };
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({
  NODE_ENV: joi.string()
    .valid('development', 'staging', 'production')
    .default('development'),
  NODE_HOSTNAME: joi.string().hostname()
    .default("localhost"),
  NODE_PORT: joi.number()
    .default(6060)
}).unknown()
  .required();
console.log('created joi schema.');

console.log('validating data...');
const { error, value: vars } = varsSchema.validate(envVars);
if (error) {
  throw new Error(`Config(deploy) validation error: ${error.message}`);
}
console.log('validated data.');

console.log('creating config(deploy)...');
const config = {
  deploy: {
    env: {
      name: vars.NODE_ENV,
      isDevelopment: vars.NODE_ENV === 'development',
      isStaging: vars.NODE_ENV === 'stage',
      isProduction: vars.NODE_ENV === 'production'
    },
    hostname: vars.NODE_HOSTNAME,
    port: vars.NODE_PORT
  }
};
console.log('created config(deploy).');

module.exports = config
