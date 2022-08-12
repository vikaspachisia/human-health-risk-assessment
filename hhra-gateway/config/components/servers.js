'use strict'

const joi = require('joi');

console.log('creating map of apps...');
const server_groups = [
  { group: 'persona', hostname: 'localhost', port: 4040 },
  { group: 'aaa', hostname: 'localhost', port: 4040 },
  { group: 'domain', hostname: 'localhost', port: 4040 },
  { group: 'interaction', hostname: 'localhost', port: 4040 }
];

console.log('created map of apps.');

console.log('reading process environment...');
let envVars = { ...process.env };
console.log('read process environment.');

console.log('creating joi schema...');
const varsSchema = joi.object({
  SERVER_GROUPS: joi.array().items({
    group: joi.string().required(),
    hostname: joi.string.required(),
    port: joi.number().required()
  })
    .default(server_groups),
}).unknown()
  .required();
console.log('created joi schema.');


console.log('validating data...');
const { error, value: vars } = varsSchema.validate(envVars);
if (error) {
  throw new Error(`Config(servers) validation error: ${error.message}`);
}
console.log('validated data.');

console.log('creating config(servers)...');
const config = {
  server_groups: vars.SERVER_GROUPS
};
console.log('created config(servers).');

module.exports = config
