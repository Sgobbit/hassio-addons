/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const { value: baseValue, error: baseError } = Joi.object()
  .keys({
    NODE_ENV: Joi
      .string()
      .valid('production', 'development', 'test')
      .default('production'),
  })
  .unknown()
  .prefs({ errors: { label: 'key' } }).validate(process.env);
if (baseError) {
  throw new Error(`Config validation error: ${baseError}`);
}

let baseDataPath = '/';
if (baseValue.NODE_ENV === 'development') {
  baseDataPath = path.join(__dirname, '../../../');

  // Load develop environment
  dotenv.config({
    path: path.join(baseDataPath, 'data/.env')
  });
}

dotenv.config({
  path: path.join(baseDataPath, 'data/options.json')
});

const { value: extendedValue, error: extendedError } = Joi.object()
  .keys({
    HASS_TOKEN: Joi.string().required(),
    HASS_URL: Joi.string().required(),
    HASS_IP: Joi.string().required()
  })
  .unknown()
  .prefs({ errors: { label: 'key' } }).validate(process.env);
if (extendedError) {
  throw new Error(`Config validation error: ${extendedError}`);
}

// Emulated HUE seed
const mac = '0017887ebe7d'; // FIXME

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  env: baseValue.NODE_ENV,
  database: {
    path: path.join(baseDataPath, 'data/alessio.db')
  },
  hassio: {
    token: extendedValue.HASS_TOKEN,
    apiUrl: extendedValue.HASS_URL,
    lanAddress: extendedValue.HASS_IP
  },
  emulatedBridge: {
    id: `${mac.substring(0, 6).toUpperCase()}FFFE${mac.substring(6,6).toUpperCase()}`,
    serial: `${mac.toLowerCase()}`,
    uuid: `2f402f80-da50-11e1-9b23-${mac.toLowerCase()}`
  },
  filters: {
    // FIXME
    exposedByDefault: false,
    domains: [ 'light', 'switch' ],
    entities: [
      {
        entity: 'light.knx_piano1_bagno_lampadario_luce',
        name: 'Luce bagno',
        expose: true
      }
    ]
  }
};
