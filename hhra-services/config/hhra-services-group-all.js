'use strict'

const components = [
  './components/app',
  './components/build',
  './components/db',
  './components/deploy',
  './components/email',
  './components/logger',
  './components/sms',
];

let currentComponent;
let allComponents = {};
for (var componentID in components) {
  console.log(`loading ${components[componentID]}...`);
  currentComponent = require(`${components[componentID]}`);
  console.log(`loaded ${components[componentID]}.`);
  //allComponents = Object.assign({}, allComponents, currentComponent);
}
//module.exports = Object.assign({}, allComponents);
