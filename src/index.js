/**
 * index.js
 * src
 *
 * Created by samover on 18/07/2017.
 */

const express = require('express');

/**
 * MODULE CONFIGURATION
 */
require('./config/environment.config');
global.diContainer = require('./config/diContainer.config');

const router = require('./routes');
const helmet = require('./middlewares/helmet.middleware');

const { logger } = diContainer.cradle;
const port = process.env.PORT || 3000;
const app = express();

app.use(helmet);

// Set CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, RefreshToken');
  next();
});

/**
 * ROUTE DECLARATIONS
 */
app.use('/', router);

/**
 * START SERVER
 */
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

process.on('unhandledRejection', (reason) => {
  logger.warn('Undhandled Rejection', reason);
});

process.on('warning', (warning) => {
  logger.warn(warning.stack);
});

module.exports = app;
