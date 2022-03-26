/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const catchAsync = require('../utils/catch-async.util');
const hassService = require('../services/hass.service');

// > > > > > > > > > > > > > > > > > > > > > > > The code

/**
 *     DELETE /api/:username/lights/:lightid
 *     Delete a light
 *     @see https://developers.meethue.com/develop/hue-api/lights-api/#del-lights
 */
const deleteLight = catchAsync(async (req, res) => {
  //TODO
  res.status(200).json({});
});

/**
 *    GET /api/:username/lights/:light
 *    Receive a light from the light list
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#get-attr-and-state
 */
const getLight = catchAsync(async (req, res) => {
  //TODO
  res.status(200).json({});
});

/**
 *    GET /api/:username/lights
 *    Receive list of lights
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#get-all-lights
 */
const getLights = catchAsync(async (req, res) => {
  let lights = await hassService.getEntities();

  // Define response data
  let response = {};
  lights.forEach((row) => {
    //TODO fix single row data structure
    response[Object.keys(response).length + 1] = {
      //type: "Extended color light",
      name: row.name,
      uniqueid: row.entity,
      swversion: "5.105.0.21169",
      state: {
        reachable: true
      }
    };
  });

  res.status(200).json(response);
});

/**
 *    GET /api/:username/lights/new
 *    Receive list of new lights
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#get-new-lights
 */
const getLightsNew = catchAsync(async (req, res) => {
  let lights = await hassService.getEntities();

  // Define response data
  let response = {};
  lights.forEach((row) => {
    response[Object.keys(response).length + 1] = { name: row.name };
  });
  response.lastscan = new Date().toISOString().replace(/\..+/, '')

  res.status(200).json(response);
});

/**
 *    POST /api/:username/lights
 *    Initiate search for new lights
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#search-for-new-lights
 */
const postLights = catchAsync(async (req, res) => {
  let lights = await hassService.getEntities();

  res.status(200).json([{ success: { '/lights': 'Searching for new devices' } }]);
});

/**
 *    PUT /api/:username/lights/:lightid
 *    Set attributes of a light
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#set-light-attr-rename
 */
const putLight = catchAsync(async (req, res) => {
  //TODO
  res.status(200).json({});
});

/**
 *    PUT /api/:username/lights/:light/state
 *    Set state of a light
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#set-light-state
 */
const putLightState = catchAsync(async (req, res) => {
  const { light } = req.params;
  const { on } = req.body;

  // Global control mode
  let global_control_mode = await hassService.getAlessioAbility('switch.hassio_alessio_control_mode');
  if (!global_control_mode) {
    return res.status(200).json([{ error: { type: 201, address: req.url, description: 'Control mode is disabled globally' } }]);
  }


  let light_control_mode = await hassService.getAlessioAbility(entity);
  if (!light_control_mode) {
    return res.status(200).json([{ error: { type: 201, address: req.url, description: 'Control mode is disabled on this entity' } }]);
  }

  if (typeof on !== undefined) {
    await hassService.setEntityState(light, { state: (on) ? 'on' : 'off'});
  }

  //TODO
  [
    {"success":{"/lights/1/state/bri":200}},
    {"success":{"/lights/1/state/on":true}},
    {"success":{"/lights/1/state/hue":50000}}
  ]

  res.status(200).json({});
});


// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  deleteLight,
  getLight,
  getLights,
  getLightsNew,
  postLights,
  putLight,
  putLightState
};
