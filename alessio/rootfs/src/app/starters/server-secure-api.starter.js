/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const https = require('https');
const selfsigned = require('selfsigned');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const logger = require('../commons/config/logger');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const ModuleFactory = async () => {
  logger.debug(`Secure API: starting...`);

  const api = await require('../server-api/app');

  let result = await new Promise((resolve, reject) => {
    try {
      let pems = selfsigned.generate(null, {
        keySize: 2048, // the size for the private key in bits (default: 1024)
        days: 30, // how long till expiry of the signed certificate (default: 365)
        algorithm: 'sha256', // sign the certificate with specified algorithm (default: 'sha1')
        extensions: [{ name: 'basicConstraints', cA: true }], // certificate extensions array
        pkcs7: true, // include PKCS#7 as part of the output (default: false)
        clientCertificate: true, // generate client cert signed by the original key (default: false)
        clientCertificateCN: 'jdoe' // client certificate's common name (default: 'John Doe jdoe123')
      });

      const server = https
        .createServer(
          {
            key: pems.private,
            cert: pems.cert
          },
          api
        )
        .listen(443, () => {
          logger.debug(`Secure API: successful started!`);
          return resolve(server);
        });
    } catch (err) {
      logger.debug(`Secure API: error during starting, ${err}`);
      reject(err);
    }
  });

  return result;
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = ModuleFactory();
