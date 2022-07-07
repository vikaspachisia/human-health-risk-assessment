'use strict'

const components = [
  './components/app',
  './components/build',
  './components/db',
  './components/deploy',
  './components/email',
  './components/logger',
  './components/phone',
];

let allComponents = {};
for (var component in components) {
  try {
    console.log(`loading ${component}...`);
    currentComponent = require(`${component}`);
    console.log(`loaded ${component}...`);
    //allComponents = Object.assign({}, allComponents, currentComponent);
  } catch (ex) {
    if (ex.code === 'MODULE_NOT_FOUND') {
      throw new Error(`No config for process type: ${component}`);
    }

    throw ex;
  }
}
module.exports = Object.assign({}, allComponents);
