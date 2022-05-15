'use strict'

const gateways = [
    ['web-gateway', { server: 'localhost', port: 3030 }],
    ['mobile-gateway', { server: 'localhost', port: 3032 }],
    ['api-gateway', { server: 'localhost', port: 3034 }]
];

const services = [
    ['all', { server: 'localjost', port: 4040 }], //either run all services under same service or run each service on its own but not both.
    ['account', { server: 'localjost', port: 4040 }],
    ['analytics', { server: 'localjost', port: 4042 }],
    ['audit', { server: 'localjost', port: 4044 }],
    ['auth', { server: 'localjost', port: 4046 }],
    ['chat', { server: 'localjost', port: 4048 }],
    ['notification', { server: 'localjost', port: 6060 }],
    ['profile', { server: 'localjost', port: 6062 }],
    ['register', { server: 'localjost', port: 6064 }],
    ['report', { server: 'localjost', port: 6066 }]
];