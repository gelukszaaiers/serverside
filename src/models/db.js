/**
 * db.js
 * src/models
 *
 * Created by samover on 19/07/2017.
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = class Database {
  constructor() {
    this._basename = path.basename(__filename);
    this._databaseOptions = {
      logging: false,
      dialect: 'postgres',
      native: false,
      pool: { maxConnections: 100, minConnections: 0 },
      dialectOptions: {
        ssl: true,
        native: false,
      },
    };
    this.db = {};
    this._setSequelizeInstance();
    this._importModels();
  }

  _setSequelizeInstance() {
    const dbConfig = diContainer.cradle.databaseConfig;

    if (dbConfig.isOnHeroku()) {
      this.db.sequelize = new Sequelize(dbConfig.getHerokuDbUrl(), this._databaseOptions);
    } else {
      this.db.sequelize = new Sequelize(
        dbConfig.getDatabase(),
        dbConfig.getUsername(),
        dbConfig.getPassword(),
        dbConfig.config,
      );
    }
  }

  _importModels() {
    fs.readdirSync(__dirname)
      .filter(file => file.indexOf('.') !== 0
        && file !== this._basename
        && file.slice(-3) === '.js')
      .forEach((file) => {
        const model = this.db.sequelize.import(path.join(__dirname, file));
        this.db[model.name] = model;
      });

    Object.keys(this.db).forEach((modelName) => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db);
      }
    });
  }
};
