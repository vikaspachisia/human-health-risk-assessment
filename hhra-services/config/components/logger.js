'use strict'

const joi = require('joi');
const buildConfig = require('./build');

console.log('reading process environment...');
let envVars = { ...process.env };
console.log('read process environment.');

console.log('creating joi schema...');
const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
    .valid('error', 'warn', 'info', 'verbose', 'debug')
    .default(buildConfig.build.configuration.isDebugBuild ? 'debug' : 'info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('true')
    .falsy('false')
    .default(true)
}).unknown()
  .required();
console.log('created joi schema.');

console.log('validating data...');
const { error, value: vars } = envVarsSchema.validate(envVars);
if (error) {
  throw new Error(`Config(logger) validation error: ${error.message}`);
}
console.log('validated data.');

console.log('creating config(logger)...');
const config = {
  logger: {
    level: vars.LOGGER_LEVEL,
    enabled: vars.LOGGER_ENABLED
  }
};
console.log('created config(logger).');

module.exports = config
