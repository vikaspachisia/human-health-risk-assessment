'use strict'

const build = require('./components/build');
const deploy = require('./components/deploy');
const logger = require('./components/logger');
const server = require('./components/server');
const server_registry = require('./components/server-registry');

module.exports = Object.assign({}, build, deploy, logger, server, server_registry);