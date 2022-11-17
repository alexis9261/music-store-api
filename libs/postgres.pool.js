const { Pool } = require('pg')

const { config } = require('./../config/config');

// Codificamos el user y pass a formato Uri
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// Creamos la cadena de conexion a BD
const CONECTION_CHAIN = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Creamos la instacia de la conexion a BD
const pool = new Pool({ connectionString: CONECTION_CHAIN });

module.exports = pool;
