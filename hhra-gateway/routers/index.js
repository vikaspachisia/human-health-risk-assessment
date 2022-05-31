const web = require('./web');
const mobile = require('./mobile');
const api = require('./api');

module.exports = Object.assign({}, web, mobile, api);