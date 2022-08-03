module.exports = {
  apps: [{
    name: 'hhra-services-group-all',
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
      APPID: "hhra-services-group-all",
      ALLOWED_APPS: ['account', 'profile', 'aaa', 'log', 'report', 'chat', 'phone'],
      BLOCKED_APPS: [],
      SECRET_KEYS: ['webv1.0'],
      //Utility details
      LOGGER_ENABLED: true,
      //DB Details
      DB_PROVIDER: 'mongo',
      DB_NAME: 'hhra-services-db-all',
      //Email details
      EMAIL_PROVIDER: 'aws',
      EMAIL_NAME: 'hhra-services-email-all',
      EMAIL_HOSTNAME: 'email-smtp.us-west-1.amazonaws.com',
      EMAIL_PORTS: [465, 25],
      EMAIL_SECURE: true,
      EMAIL_USER:'AKIAW77T7ANQHGOAE23C',
      EMAIL_PWD: 'BKvSJR+WKmqQ2agf8Zgs1n7tn2ioyO7F2i95OlyFt/dL',      
      //SMS details
      SMS_PROVIDER: 'aws',
      SMS_NAME: 'hhra-services-email-all',
      SMS_HOSTNAME: 'email-smtp.us-west-1.amazonaws.com',
      SMS_PORTS: [465, 25],
      SMS_SECURE: true,
      SMS_USER: 'AKIAW77T7ANQHGOAE23C',
      SMS_PWD: 'BKvSJR+WKmqQ2agf8Zgs1n7tn2ioyO7F2i95OlyFt/dL'
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
