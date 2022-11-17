const {Client} = require('pg')
// import pg as Client from "pg";

async function getConecction(){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'nodetest',
    user: 'test',
    password: 'test123',
  });

  await client.connect();
  return client;

}

module.exports = getConecction;
