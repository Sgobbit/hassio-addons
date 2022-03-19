/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// * * * * * * * * * * * * * Import externals
const Joi = require('joi');

// * * * * * * * * * * * * * The code
const postOne = {
  body: Joi.object()
    .keys({
      devicetype: Joi.any().required(),
    })
};

// * * * * * * * * * * * * * Module exports
module.exports = {
  postOne
};
