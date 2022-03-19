/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// * * * * * * * * * * * * * Import externals
const express = require('express');

// * * * * * * * * * * * * * Import internals
const usersController = require('../controllers/users.controller');
const validate = require('../middlewares/validate.middleware');
const usersValidation = require('../validations/users.validation');

// * * * * * * * * * * * * * The code
const router = express.Router();

/**
 * Create new user
 * 
 * Expects `devicetype` in body property.
 *
 * @see https://developers.meethue.com/develop/hue-api/7-configuration-api/#create-user
 */
router.post(
  '/api',
  [
    validate(usersValidation.postOne)
  ],
  usersController.postOne
);

// * * * * * * * * * * * * * Module exports
module.exports = router;
