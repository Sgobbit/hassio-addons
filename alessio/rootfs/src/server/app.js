/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// * * * * * * * * * * * * * Import externals
const express = require('express');
const helmet = require('helmet');

// * * * * * * * * * * * * * Import internals
const morgan = require('./config/morgan');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');
const routes = require('./routes');
const ApiError = require('./utils/api-error.util');

// * * * * * * * * * * * * * The code
const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// * * * * * * * * * * * * * Module exports
module.exports = app;
