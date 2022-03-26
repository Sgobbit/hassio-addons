/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const Joi = require('joi');

// > > > > > > > > > > > > > > > > > > > > > > > The code

/**
 *    POST /api
 *    Create new user
 *    @see https://developers.meethue.com/develop/hue-api/7-configuration-api/#create-user
 */
const postUser = {
  body: Joi.object().keys({
    devicetype: Joi.string().required()
  })
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  postUser
};
