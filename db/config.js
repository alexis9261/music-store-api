const { config } = require('./../config/config');

// Codificamos el user y pass a formato Uri
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const CONECTION_CHAIN = `${config.dbEngine}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Aqui definimos los ambientes de trabajo
module.exports = {
  development: {
    url: CONECTION_CHAIN,
    dialect: `${config.dbEngine}`,
  },
  production: {
    url: CONECTION_CHAIN,
    dialect: `${config.dbEngine}`,
  }
}
