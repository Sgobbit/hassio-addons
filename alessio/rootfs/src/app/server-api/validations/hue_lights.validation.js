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
 *    POST /api/:username/lights
 *    Initiate search for new lights
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#search-for-new-lights
 */
const postLights = {
  body: Joi.object().keys({
    deviceid: Joi.array().items(Joi.string()).max(10)
  })
};

const putLightState = {
  body: Joi.object().keys({
    on: Joi.bool(),
    bri: Joi.number().integer().min(1).max(254),
    hue: Joi.number().integer().min(0).max(65535),
    sat: Joi.number().integer().min(0).max(254),
    xy: Joi.any(), //FIXME
    ct: Joi.any(), //FIXME
    alert: Joi.any(), //FIXME
    effect: Joi.any(), //FIXME
    transitiontime: Joi.any(), //FIXME
    bri_inc: Joi.any(), //FIXME
    hue_inc: Joi.any(), //FIXME
    sat_inc: Joi.any(), //FIXME
    xy_inc: Joi.any(), //FIXME
    ct_inc: Joi.any(), //FIXME
  })
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  postLights,
  putLightState
};
