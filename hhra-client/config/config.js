'use strict'

const common = require('./components/build');
const logger = require('./components/deploy');
const mongo = require('./components/logger');
const server = require('./components/product');
const server = require('./components/server');

module.exports = Object.assign({}, common, logger, mongo, server);