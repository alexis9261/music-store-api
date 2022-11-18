const { Sequelize } = require('sequelize')

const { config } = require('./../config/config');
const setupModels = require('./../db/models/index');

const options = {
  dialect: `${config.dbEngine}`,
  logging: config.isProd ? false : true,
}

let CONECTION_CHAIN = ''
if(config.isProd){
  CONECTION_CHAIN = config.dbUrl
}else{
  // Codificamos el user y pass a formato Uri
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);

  // Creamos la cadena de conexion a BD
  CONECTION_CHAIN = `${config.dbEngine}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}


const sequelize = new Sequelize(CONECTION_CHAIN, options);

setupModels(sequelize);
// Lee los modelos y crea las tablas
sequelize.sync();

module.exports = sequelize
