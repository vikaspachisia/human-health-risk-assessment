module.exports = {
    apps: [{
        name: 'web gateway',
        script: 'app.js',
        watch: '.',
        env: {
            APPID: 'web',
            BUILD_CONFIGURATION: "debug",
            BUILD_ARCHITECTURE: "x64",
            NODE_ENV: "development",
            NODE_HOSTNAME: "localhost",
            NODE_PORT: 4040,
            NODE_ENABLED: false,
            SESSION_SECRET: ["webv1.0"],
            LOGGER_ENABLED: true,
            SERVERS: {
                HOSTNAME: "localhost",
                PORT: 5050,
                ENABLED: true,
                SERVICES:
                    [
                        ['auth',
                            ['user', { hostname: 'localhost', port: 5052 }],
                            ['device', { hostname: 'localhost', port: 5054 }]
                        ],
                        ['profile',
                            ['user', { hostname: 'localhost', port: 5056 }],
                            ['device', { hostname: 'localhost', port: 5058 }]
                        ],
                        ['account',
                            ['user', { hostname: 'localhost', port: 5060 }],
                            ['device', { hostname: 'localhost', port: 5062 }]
                        ],
                        ['audit',
                            ['all', { hostname: 'localhost', port: 5064 }]
                        ],
                        ['telemetry',
                            ['all', { hostname: 'localhost', port: 5066 }],
                            ['web', { hostname: 'localhost', port: 5068 }],
                            ['mobile', { hostname: 'localhost', port: 5070 }],
                            ['api', { hostname: 'localhost', port: 5072 }]
                        ],
                        ['report',
                            ['all', { hostname: 'localhost', port: 5074 }],
                            ['web', { hostname: 'localhost', port: 5076 }],
                            ['mobile', { hostname: 'localhost', port: 5078 }],
                            ['api', { hostname: 'localhost', port: 5080 }]
                        ],
                        ['chat',
                            ['all', { hostname: 'localhost', port: 5082 }],
                            ['web', { hostname: 'localhost', port: 5084 }],
                            ['mobile', { hostname: 'localhost', port: 5086 }],
                            ['api', { hostname: 'localhost', port: 5088 }]
                        ],
                        ['phone',
                            ['all', { hostname: 'localhost', port: 5090 }]
                        ]
                    ]
            }
        },
        env_staging: {
            BUILD_CONFIGURATION: "release",
            NODE_ENV: "staging"
        },
        env_production: {
            BUILD_CONFIGURATION: "release",
            NODE_ENV: "production"
        }
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
