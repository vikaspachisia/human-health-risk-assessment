module.exports = {
    apps: [{
        name: 'web gateway',
        script: 'app.js',
        watch: '.',
      env: {
        //Build details
        BUILD_CONFIGURATION: "debug",
        BUILD_ARCHITECTURE: "x64",
        //Deployment details
        NODE_ENV: "development",
        NODE_HOSTNAME: "localhost",
        NODE_PORT: 4040,
        NODE_ENABLED: true,
        //App details
        APP_GROUP: "default",
        BLOCKED_APPS: [],
        SECRET_KEYS: ['webv1.0'],
        //Utility details
        LOGGER_ENABLED: true,
        //Server group details
        SERVER_GROUPS: [
          { group: 'persona', hostname: 'localhost', port: 4040 },
          { group: 'aaa', hostname: 'localhost', port: 4040 },
          { group: 'domain', hostname: 'localhost', port: 4040 },
          { group: 'interaction', hostname: 'localhost', port: 4040 }
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
