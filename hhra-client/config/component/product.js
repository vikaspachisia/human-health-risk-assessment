'use strict'

const joi = require('joi');
const constants = require('constants')

const varsSchema = joi.object({
    PRODUCT_TYPE: joi.string()
        .valid(constants.servers.map((server) => { server.key }))
        .default(constants.servers[0].hostname)
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(product) validation error: ${error.message}`);
}

const config = {
    product: {
        type: vars.PRODUCT_TYPE
    }
};

module.exports = config