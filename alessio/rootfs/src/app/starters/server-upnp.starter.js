/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const { createSocket } = require('dgram');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const config = require('../commons/config/config');
const logger = require('../commons/config/logger');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const ModuleFactory = async () => {
  const responseTemplate = (stValue, usnValue) => {
    let template = '';
    template += `HTTP/1.1 200 OK\r\n`;
    template += `CACHE-CONTROL: max-age=60\r\n`;
    template += `EXT:\r\n`;
    template += `LOCATION: http://${config.hassio.lanAddress}:80/description.xml\r\n`;
    template += `SERVER: Linux/3.14.0 UPnP/1.0 IpBridge/1.20.0\r\n`;
    template += `hue-bridgeid: ${config.emulatedBridge.id}\r\n`;
    template += `ST: ${stValue}\r\n`;
    template += `USN: ${usnValue}\r\n`
    template += `\r\n`;
    return template;
  }

  const socket = createSocket({
    type: 'udp4',
    reuseAddr: true
  });

  socket.on('message', (msg, rinfo) => {
    if (msg.indexOf('M-SEARCH') >= 0) {
      logger.debug(`UPNP: Received M-SEARCH from ${rinfo.address}:${rinfo.port}`);

      socket.send(
        responseTemplate(`upnp:rootdevice`,`uuid:${config.emulatedBridge.uuid}:upnp:rootdevice`),
        rinfo.port,
        rinfo.address,
        (err) => {
          if (err) {
            logger.error(err);
          }
        }
      );

      socket.send(
        responseTemplate(`uuid:${config.emulatedBridge.uuid}`, `uuid:${config.emulatedBridge.uuid}`),
        rinfo.port,
        rinfo.address,
        (err) => {
          if (err) {
            logger.error(err);
          }
        }
      );

      socket.send(
        responseTemplate(`urn:schemas-upnp-org:device:basic:1`, `uuid:${config.emulatedBridge.uuid}`),
        rinfo.port,
        rinfo.address,
        (err) => {
          if (err) {
            logger.error(err);
          }
        }
      );
    }
  });

  let result = await new Promise((resolve, reject) => {
    try {
      logger.debug(`UPNP: starting...`);
      socket.bind(1900, () => {
        socket.addMembership('239.255.255.250');

        logger.debug(`UPNP: successful started!`);
        return resolve(socket);
      });
    } catch (err) {
      logger.debug(`UPNP: error during starting, ${err}`);
      reject(err);
    }
  });

  return result;
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = ModuleFactory();
