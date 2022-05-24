import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import initCoffeeModel from './coffee.mjs';
import initUserModel from './users.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Coffee = initCoffeeModel(sequelize, Sequelize.DataTypes);

// one user can have many different coffees favorites,one coffee can belong to many users' favorites
db.User.belongsToMany(db.Coffee, { through: 'user_coffees' });
db.Coffee.belongsToMany(db.User, { through: 'user_coffees' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
