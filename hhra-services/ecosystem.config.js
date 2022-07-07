module.exports = {
  apps: [{
    name: 'all',
    script: 'app.js',
    watch: '.',
    env: {
      APPID: "all",
      BUILD_CONFIGURATION: "debug",
      BUILD_ARCHITECTURE: "x64",
      NODE_ENV: "development",
      NODE_HOSTNAME: "localhost",
      NODE_PORT: 4040,
      NODE_ENABLED: true,
      LOGGER_ENABLED: true,
      ALLOW_APPS: [['account', 'profile', 'aaa', 'log', 'report', 'chat', 'phone']],
      BLOCK_APPS: [[]],
      SECRET_KEYS: ['webv1.0']
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

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
