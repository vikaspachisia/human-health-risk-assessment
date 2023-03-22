'use strict'
const path = require('path');
/*
 * The below information is educational and not specific to this project or code.
 * I will remove this comment when I move this information into some place on internet.
 * -------------------------------------------------------------------------------------------------------------------------------------------
 * The dotenv config is being done outside code as a --require module to node.js.
 * Different systems such as npm, pm2 and the bare node.js have different mechanism of requiring a module.
 * e.g.
 *      "pm2 start" uses a config file such as 'ecosystem.config.js' and thus the require statement is defined in a certain way there.
 *      "npm start" uses a package file such as 'package.json" and thus the require statement is defined in a certain way there.
 *      "node.js app" can use various node options, script arguments and other mechanisms to perform the require on a module.
 *
 * Note:
 * 1. All of the above can run without a configuration file if your app can work without any special configuration.
 * 2. If you prefer to handle these variations in a single consistent place then uncomment and update as needed the below require statement
 *    and remove the requires from other systems like pm2, npm and the bare node.js
 * 3. the bare node.js can be run from command line or by pressing F5 (Run Project) in Visual Studio. This is of great help in debugging.
 * -------------------------------------------------------------------------------------------------------------------------------------------
 */
//const dotenvConfig = require('dotenv').config({ path: 'ecosystem.config.env' });

const app_group = `./${process.env.APP_GROUP}`;


let config;
try {
  console.log(`loading ${app_group}...`);
  config = require(`${app_group}`);
  console.log(`loaded ${app_group}...`);
} catch (ex) {
    if (ex.code === 'MODULE_NOT_FOUND') {
      throw new Error(`No config for process type: ${app_group}`);
    }

    throw ex;
}

module.exports = config
