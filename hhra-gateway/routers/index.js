const root = require('./root');
const web = require('./web');
const mobile = require('./mobile');
const api = require('./api');

module.exports = Object.assign({}, root, web, mobile, api);
