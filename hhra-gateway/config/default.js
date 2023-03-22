'use strict'

const components = [
  './components/app',
  './components/build',
  './components/deploy',
  './components/logger',
  './components/backend',
  './components/frontend'
];

let loadedComponents = [];
for (var componentID in components) {
  console.log(`loading ${components[componentID]}...`);
  loadedComponents[componentID] = require(`${components[componentID]}`);
  console.log(`loaded ${components[componentID]}.`);
}

console.log("activecomponents:" + JSON.stringify(loadedComponents));

module.exports = Object.assign({}, ...loadedComponents);
