/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import FIFO
const config = require('./commons/config/config');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const logger = require('./commons/config/logger');
const { initDatabase } = require('./database');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const init = async () => {
  logger.info(`Alessio addon is starting...`);

  // Print config
  if (config.env === 'development') {
    logger.debug(`Environment config: \n${JSON.stringify(config, null, 2)}`);
  }

  await initDatabase();

  const serverPlainAPI = await require('./starters/server-plain-api.starter');
  const serverSecureAPI = await require('./starters/server-secure-api.starter');
  const serverUPNP = await require('./starters/server-upnp.starter');

  //const serverUI = await require('./server-ui');

  logger.info(`Alessio addon has been started!`);
};

init();
