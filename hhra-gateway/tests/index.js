const testCore = require('./test-core');
const testMiddlewares = require('./test-middlewares');
const testRouters = require('./test-routers');
const testScripts = require('./test-scripts');
const testUtils = require('./test-utils');

module.exports = Object.assign({}, testCore, testMiddlewares, testRouters, testScripts, testUtils);