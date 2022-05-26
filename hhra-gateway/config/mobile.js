'use strict'

const build = require('./components/build');
const deploy = require('./components/deploy');
const logger = require('./components/logger');
const server = require('./components/server');

module.exports = Object.assign({}, build, deploy, logger, product, server);