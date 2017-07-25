/**
 * diContainer.config.js
 * src/config
 *
 * Created by samover on 18/07/2017.
 */

const awilix = require('awilix');

const di = awilix.createContainer();

di.loadModules([
  'src/models/db.js',
  'src/config/**/*.js',
  'src/infrastructure/**/*.js',
  'src/middlewares/**/*.js',
  'src/services/**/*.js',
  'src/controllers/**/*.js',
], {
  formatName: 'camelCase',
  registrationOptions: {
    lifetime: awilix.Lifetime.SINGLETON,
  },
});

module.exports = di;
