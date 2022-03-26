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
//const groupsController = require('../controllers/hue_groups.controller');
//const validate = require('../middlewares/validate.middleware');
//const groupsValidation  = require('../validations/hue_groups.validation');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const router = express.Router();

/**
 *    POST /api/:username/groups
 *    Create a group
 *    @see https://developers.meethue.com/develop/hue-api/groupds-api/#create-group
 */
router.post(
  '/groups',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *    GET /api/:username/groups
 *    Receive list of groups
 *    @see https://developers.meethue.com/develop/hue-api/groupds-api/#get-all-groups
 */
router.get(
  '/groups',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *    GET /api/:username/groups/:groupid
 *    Receive a group from the group list
 *    @see https://developers.meethue.com/develop/hue-api/groupds-api/#get-group-attr
 */
router.get(
  '/groups/:groupid',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *    PUT /api/:username/groups/:groupid
 *    Set attributes of a group (e.g. name, lights, or class)
 *    @see https://developers.meethue.com/develop/hue-api/groupds-api/#set-group-attr
 */
router.put(
  '/groups/:groupid',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *     PUT /api/:username/groups/:groupid/action
 *     Set action of a group
 *     @see https://developers.meethue.com/develop/hue-api/groupds-api/#set-gr-state
 */
router.put(
  '/groups/:groupid/action',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

/**
 *    DELETE /api/:username/groups/:groupid
 *    Delete a group
 *    @see https://developers.meethue.com/develop/hue-api/groups-api/#del-group
 */
router.delete(
  '/groups/:groupid',
  (req, res) => {
    // TODO
    res.status(200).json([{ 'success': {} }]);
  }
);

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = router;
