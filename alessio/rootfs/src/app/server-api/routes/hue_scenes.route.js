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
//const scenesController = require('../controllers/hue_scenes.controller');
//const validate = require('../middlewares/validate.middleware');
//const scenesValidation  = require('../validations/hue_scenes.validation');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const router = express.Router();

/**
 *     POST /api/:username/scenes
 *     Create a scene
 *     @see https://developers.meethue.com/develop/hue-api/4-scenes/#create-scene
 */
router.post(
  '/scenes',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *     GET /api/:username/scenes
 *     Receive list of scenes
 *     @see https://developers.meethue.com/develop/hue-api/4-scenes/#get-all-scenes
 */
router.get(
  '/scenes',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *    GET /api/:username/scenes/:sceneid
 *    Receive scene from the scenes list
 *    @see https://developers.meethue.com/develop/hue-api/4-scenes/#get-scene
 */
router.get(
  '/scenes/:sceneid',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *    PUT /api/:username/scenes/:sceneid
 *    Set attributes of a scene (e.g. name, lights, or lightstates)
 *    @see https://developers.meethue.com/develop/hue-api/4-scenes/#43_modify_scene
 */
router.put(
  '/groups/:sceneid',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *    DELETE /api/:username/scenes/:sceneid
 *    Delete a scene
 *    @see https://developers.meethue.com/develop/hue-api/4-scenes/#delete-scene
 */
router.delete(
  '/scenes/:sceneid',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = router;
