'use strict'

const products = [
    [
        'web',
        {
            name: 'Web Service',
            description: 'The front-end/web client application primarily serving desktop form factors.',
            default: {
                hostname: 'localhost',
                port: 3030
            }
        }
    ],
    [
        'mobile',
        {
            name: 'Mobile Client',
            description: 'The front-end/web client application primarily service mobile form factors.',
            default: {
                hostname: 'localhost',
                port: 3032
            }
        }
    ],
    [
        'api',
        {
            name: 'API Client',
            description: 'The api client application most likely not serving UI/UX.',
            default: {
                hostname: 'localhost',
                port: 3034
            }
        }
    ]
];

const joi = require('joi');

const varsSchema = joi.object({
    PRODUCT_TYPE: joi.string()
        .valid(products.map((key, value) => { key }))
        .default(products[0].key)
}).unknown()
    .required();

const { error, value: vars } = varsSchema.validate(process.env);
if (error) {
    throw new Error(`Config(product) validation error: ${error.message}`);
}

const config = {
    product: {
        type: vars.PRODUCT_TYPE,
        name: products[vars.PRODUCT_TYPE].name,
        description: products[vars.PRODUCT_TYPE].description,
        defaultHostname: products[vars.PRODUCT_TYPE].default.hostname,
        defaultPort: products[vars.PRODUCT_TYPE].default.port
    }
};

module.exports = config