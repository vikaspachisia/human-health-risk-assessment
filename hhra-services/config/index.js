'use strict'
const path = require('path');
const app_group = `./${process.env.APP_GROUP}`;


let config;
try {
  console.log(`loading ${app_group}...`);
  config = require(`${app_group}`);
  console.log(`loaded ${app_group}...`);
} catch (ex) {
  if (ex.code === 'MODULE_NOT_FOUND') {
    throw new Error(`No config for process type: ${app_group}`);
  }

  throw ex;
}

module.exports = config
