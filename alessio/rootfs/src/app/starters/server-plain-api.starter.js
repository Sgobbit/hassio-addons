/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const logger = require('../commons/config/logger');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const ModuleFactory = async () => {
  logger.debug(`Plain API: starting...`);

  const api = await require('../server-api/app');

  let result = await new Promise((resolve, reject) => {
    try {
      const server = api.listen(80, () => {
        logger.debug(`Plain API: successful started!`);
        return resolve(server);
      });
    } catch (err) {
      logger.debug(`Plain API: error during starting, ${err}`);
      reject(err);
    }
  });

  return result;
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = ModuleFactory();
