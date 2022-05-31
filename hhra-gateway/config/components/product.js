'use strict'

const products = [
    [
        'web',
        {
            name: 'Web Client Gateway',
            description: 'The front-end/web client application gateway primarily servicing desktop/laptop form factors.'
        }
    ],
    [
        'mobile',
        {
            name: 'Mobile Client Gateway',
            description: 'The front-end/web client application gateway primarily servicing mobile form factors.'            
        }
    ],
    [
        'api',
        {
            name: 'API Client Gateway',
            description: 'The api client application gateway that can improve api usage experience.'            
        }
    ]    
];

const joi = require('joi');

const varsSchema = joi.object({
    PRODUCT_TYPE: joi.string()
        .valid(products.map((key, value) => {key}))
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
        description: products[vars.PRODUCT_TYPE].description
    }
};

module.exports = config