/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const { createLogger, format, transports } = require('winston');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const config = require('./config');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: format.combine(
    enumerateErrorFormat(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    config.env === 'development' ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = logger;
