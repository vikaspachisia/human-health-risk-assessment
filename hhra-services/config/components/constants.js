'use strict'

const servers = [
    ['all', { server: 'localhost', port: 4040 }], //either run all services under same service or run each service on its own but not both.
    ['account', { server: 'localhost', port: 4040 }],
    ['analytics', { server: 'localhost', port: 4042 }],
    ['audit', { server: 'localhost', port: 4044 }],
    ['auth', { server: 'localhost', port: 4046 }],
    ['chat', { server: 'localhost', port: 4048 }],
    ['notification', { server: 'localhost', port: 6060 }],
    ['profile', { server: 'localhost', port: 6062 }],
    ['register', { server: 'localhost', port: 6064 }],
    ['report', { server: 'localhost', port: 6066 }]
];