/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// * * * * * * * * * * * * * Import externals
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

// * * * * * * * * * * * * * The code
dotenv.config({ path: path.join(__dirname, '../../.env') }); // Load environment when develop
dotenv.config({ path: '/data/options.json' }); // Load Home Assistant addon config

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi
      .string()
      .valid('production', 'development', 'test')
      .default('production'),

    // Home assistant provided enviroment variables
    SUPERVISOR_TOKEN: Joi.string().required(),

    // User defined addon config, loaded from /data/options.json
    verbose: Joi.bool().default(false)
  })
  .unknown();

const { value, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error}`);
}

// * * * * * * * * * * * * * Module exports
module.exports = {
  env: value.NODE_ENV,
  hassToken: value.SUPERVISOR_TOKEN,
  verbose: value.verbose
};
