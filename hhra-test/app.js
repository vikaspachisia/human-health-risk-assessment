'use strict'

const appID = 'web'

let config
try {
    console.log(appID);
    console.log("loading `./${appID}`");
    config = require(`./${appID}`)
} catch (ex) {
    if (ex.code === 'MODULE_NOT_FOUND') {
        throw new Error(`No config for process type: ${appID}`)
    }

    throw ex
}

module.exports = config