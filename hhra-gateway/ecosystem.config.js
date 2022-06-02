module.exports = {
    apps: [{
      name: 'web',
    script: 'app.js',
        watch: '.',
        env: {
            BUILD_CONFIGURATION: "debug",
            BUILD_ARCHITECTURE: "x64",
            NODE_ENV: "development",
            NODE_HOSTNAME: "localhost",
            NODE_PORT: 4040,
            NODE_ENABLED: false,
            SESSION_SECRET: ["webv1.0"],
            LOGGER_ENABLED: true,
            SERVERS: [
                ['auth',
                    ['user', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 2, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true}) }],
                    ['device', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 4, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }]
                ],
                [   'profile',
                    ['user', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 6, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['device', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 8, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }]
                ],
                [   'account',
                    ['user', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 10, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['device', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 12, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }]
                ],
                [   'audit',
                    ['all', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 14, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }]
                ],
                [   'telemetry',
                    ['all', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 16, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['web', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 18, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['mobile', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 20, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['api', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 22, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }]
                ],
                [   'report',
                    ['all', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 24, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['web', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 26, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['mobile', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 28, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['api', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 30, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }]
                ],
                [   'chat',
                    ['all', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 32, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['web', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 34, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['mobile', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 36, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }],
                    ['api', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 38, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }]
                ],
                [   'phone',
                    ['all', { hostname: 'localhost', port: joi.ref('NODE_PORT') + 40, enabled: joi.when('NODE_ENABLED', { is: true, then: false, otherwise: true }) }]
                ]                 
                ]
        },
        env_staging: {

        },
        env_production: {

        }
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
