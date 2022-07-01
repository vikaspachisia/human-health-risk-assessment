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
            NODE_ENABLED: true,
            SECRET_KEYS: 'webv1.0',
            LOGGER_ENABLED: true,
            SERVERS: [
              { name: 'account', hostname: 'localhost', port: 4040 },
              { name: 'profile', hostname: 'localhost', port: 4040 },
              { name: 'aaa', hostname: 'localhost', port: 4040 },
              { name: 'log', hostname: 'localhost', port: 4040 },
              { name: 'report', hostname: 'localhost', port: 4040 },
              { name: 'chat', hostname: 'localhost', port: 4040 },
              { name: 'phone', hostname: 'localhost', port: 4040 }
            ]
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
