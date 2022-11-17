const boom = require('@hapi/boom');

const getConecction = require('../libs/postgres')

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    // Obtengo la instancia de la conexion a BD
    const client = await getConecction();
    // Realizo una query a BD
    const response = await client.query('SELECT * FROM tasks');
    // Retorno la respuesta de la query, especificamente las filas
    return response.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
