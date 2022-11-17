require('dotenv').config();

const config = {
  // la variable process es global de Nodejs
  // el metodo env es propio de la variable process
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbEngine: process.env.DB_ENIGNE
}

module.exports = {config}
