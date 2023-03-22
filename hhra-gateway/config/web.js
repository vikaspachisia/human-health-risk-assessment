'use strict'

const app = require('./components/app');
const build = require('./components/build');
const deploy = require('./components/deploy');
const logger = require('./components/logger');
const servers = require('./components/backend');
const clients = require('./components/frontend');

module.exports = Object.assign({}, app, build, deploy, logger, servers, clients);
