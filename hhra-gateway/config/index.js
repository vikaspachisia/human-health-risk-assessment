'use strict'

const productType = process.env.PRODUCT_TYPE

let config
try {
    console.log("loading `./${productType}`");
    config = require(`./${productType}`)
} catch (ex) {
    if (ex.code === 'MODULE_NOT_FOUND') {
        throw new Error(`No config for process type: ${productType}`)
    }

    throw ex
}

module.exports = config