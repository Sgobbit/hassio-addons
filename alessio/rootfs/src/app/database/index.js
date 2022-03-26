/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const loki = require('lokijs');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const config = require('../commons/config/config');
const logger = require('../commons/config/logger');

// > > > > > > > > > > > > > > > > > > > > > > > The code
let database, models;

const initDatabase = async () => {
  return new Promise((resolve, reject) => {
    try {
      logger.debug(`Local database: starting...`);

      database = new loki(
        config.database.path,
        {
          autoload: true,
          autosave: true,
          autosaveInterval: 2000,
          autoloadCallback: async () => {
            logger.debug(`Local database: successful started!`);

            // Initialize models
            models = {};

            logger.debug(`Local database: loading users table...`);
            models.users = database.getCollection('users');
            if (models.users) {
              logger.debug(`Local database: users table successful loaded!`);
            } else {
              logger.debug(`Local database: users table not found!`);
              models.users = database.addCollection('users');
              logger.debug(`Local database: users table created!`);
            }

            resolve();
          }
        }
      );
    } catch (err) {
      logger.debug(`Local database: error during starting, ${err}`);
      reject();
    }
  });
}

const getModels = () => {
  return models;
}

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  initDatabase,
  getModels
};
