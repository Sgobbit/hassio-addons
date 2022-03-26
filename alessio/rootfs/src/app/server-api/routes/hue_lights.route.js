/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const express = require('express');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const lightsController = require('../controllers/hue_lights.controller');
const validate = require('../middlewares/validate.middleware');
const lightsValidation  = require('../validations/hue_lights.validation');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const router = express.Router();

/**
 *    POST /api/:username/lights
 *    Initiate search for new lights (simulation only)
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#search-for-new-lights
 */
router.post(
  '/',
  validate(lightsValidation.postLights),
  lightsController.postLights
);

/**
 *    GET /api/:username/lights/new
 *    Receive list of new lights
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#get-new-lights
 */
router.get(
  '/new',
  //validate(lightsValidation.getLightsNew),
  lightsController.getLightsNew
);

/**
 *    GET /api/:username/lights
 *    Receive list of lights
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#get-all-lights
 */
router.get(
  '/',
  //validate(lightsValidation.getLights),
  lightsController.getLights
);

/**
 *    GET /api/:username/lights/:light
 *    Receive a light from the light list
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#get-attr-and-state
 */
router.get(
  '/:light',
  //validate(lightsValidation.getLight),
  lightsController.getLight
);

/**
 *    PUT /api/:username/lights/:lightid
 *    Set attributes of a light
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#set-light-attr-rename
 */
router.put(
  '/:light',
  //validate(lightsValidation.putLight),
  lightsController.putLight
);

/**
 *    PUT /api/:username/lights/:lightid/state
 *    Set state of a light
 *    @see https://developers.meethue.com/develop/hue-api/lights-api/#set-light-state
 */
router.put(
  '/:light/state',
  validate(lightsValidation.putLightState),
  lightsController.putLightState
);

/**
 *     DELETE /api/:username/lights/:lightid
 *     Delete a light
 *     @see https://developers.meethue.com/develop/hue-api/lights-api/#del-lights
 */
 router.delete(
  '/:light',
  //validate(lightsValidation.deleteLight),
  lightsController.deleteLight
);

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = router;
