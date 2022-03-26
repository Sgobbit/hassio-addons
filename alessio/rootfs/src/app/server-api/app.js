/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const routes = require('./routes');
const errorConverter = require('./middlewares/error-converter.middleware');
const errorHandler = require('./middlewares/error-handler.middleware');
const ApiError = require('./utils/api-error.util');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = app;
