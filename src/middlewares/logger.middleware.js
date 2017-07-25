/**
 * logger.config.js
 * src/config
 *
 * Created by samover on 18/07/2017.
 */


const winston = require('winston');
const expressWinston = require('express-winston');

const logLevel = process.env.LOG_LEVEL || process.env.DEFAULT_LOG_LEVEL;

module.exports = expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
      prettyPrint: true,
    }),
  ],
  meta: logLevel === 'debug' || logLevel === 'trace',
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
});
