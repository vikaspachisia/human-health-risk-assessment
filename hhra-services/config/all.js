'use strict'

const app = require('./components/app');
const build = require('./components/build');
const db = require('./components/db');
const deploy = require('./components/deploy');
const email = require('./components/email');
const logger = require('./components/logger');
const phone = require('./components/phone');


module.exports = Object.assign({}, app, build, db, deploy, email, logger, phone);
