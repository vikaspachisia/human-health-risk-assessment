'use strict'
const path = require('path');

//const appID = path.join(__dirname, process.env.APPID);
const appID = `./${process.env.APPID}`;
//const appID = `./config/${process.env.APPID}`;


let config;
try {
    console.log(`loading ${appID}...`);
    config = require(`${appID}`);
    console.log(`loaded ${appID}...`);
} catch (ex) {
    if (ex.code === 'MODULE_NOT_FOUND') {
        throw new Error(`No config for process type: ${appID}`);
    }

    throw ex;
}

module.exports = config