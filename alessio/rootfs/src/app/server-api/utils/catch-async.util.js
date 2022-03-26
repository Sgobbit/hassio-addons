/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > The code
const catchAsync = (fn) => (req, res, next) => {
  try {
    Promise.resolve(
      fn(req, res, next)).catch((err) => next(err)
    );
  } catch(err) {
    next(err);
  }
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = catchAsync;
