module.exports = {
  apps: [{
    name: 'hhra gateway',
    script: 'app',
    args: 'dotenv_config_path=ecosystem.config.env dotenv_config_debug=true',
    node_args: "-r dotenv/config",
    watch: '.',
    autorestart: false
  }],

  deploy : {
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
