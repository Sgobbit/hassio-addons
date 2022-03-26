/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const { getModels } = require('../../database');
const catchAsync = require('../utils/catch-async.util');
const hassService = require('../services/hass.service');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const { users: usersModel } = getModels();

/**
 *    POST /api
 *    Create new user
 *    @see https://developers.meethue.com/develop/hue-api/7-configuration-api/#create-user
 */
const postUser = catchAsync(async (req, res) => {
    const { devicetype } = req.body;

    let link_enable = await hassService.getAlessioAbility('switch.hassio_alessio_link_mode');
    if (!link_enable) {
      return res.status(200).json([{ error: { type: 101, address: req.url, description: 'link button not pressed' } }]);
    }

    let user = usersModel.findOne({ devicetype });
    if (!user) {
      user = {
        devicetype,
        username: randomstring.generate({ length: 40, charset: '0123456789abcdefghijklmnopqrstuvwxyz' }),
        clientkey: randomstring.generate({ length: 32, charset: '0123456789abcdefghijklmnopqrstuvwxyz' }).toUpperCase()
      };
      usersModel.insert(user);
      logger.debug(`Client ${devicetype} registered`);
    }

    res.status(200).json([{ 'success': { username: user.username, clientkey: user.clientkey } }]);
  }
);

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  postUser
};
