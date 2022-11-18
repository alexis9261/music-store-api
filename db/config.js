const { config } = require('./../config/config');

let CONECTION_CHAIN = ''
// Si el ambiente esta en produccion, la PaaS(heroku para este caso) nos enviara la url de conexion a BD
// Por tal motivo simplemente la capturamos - esta captura se da en el archivo config/config.js
if(config.isProd){
  CONECTION_CHAIN = config.dbUrl
}else{
  // Codificamos el user y pass a formato Uri
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  CONECTION_CHAIN = `${config.dbEngine}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

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
