'use strict'
const path = require('path');
const appName = `./${process.env.APP_NAME}`;


let config;
try {
  console.log(`loading ${appName}...`);
  config = require(`${appName}`);
  console.log(`loaded ${appName}...`);
} catch (ex) {
  if (ex.code === 'MODULE_NOT_FOUND') {
    throw new Error(`No config for process type: ${appName}`);
  }

  throw ex;
}

module.exports = config
