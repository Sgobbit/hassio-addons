/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// * * * * * * * * * * * * * Import externals
const httpStatus = require('http-status');

// * * * * * * * * * * * * * Import internals
const catchAsync = require('../utils/catch-async.util');

// * * * * * * * * * * * * * The code
const postOne = catchAsync(async (req, res) => {
  //TODO

  res.status(httpStatus.OK).send({});
});

// * * * * * * * * * * * * * Module exports
module.exports = {
  postOne
};
