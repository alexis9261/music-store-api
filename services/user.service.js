const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize')

class UserService {
  constructor() {}

  /**
   * @description find all users
   * @param {object} body - body request
   * @returns {object} - User
   */
  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  /**
   * @description find all users
   * @returns {collection} - { fields, values, tuples }
   */
  async find() {
    // Mediante el modelo User obtengo todos los registros
    const response = await models.User.findAll();
    // Retorno la data
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user)
      throw boom.notFound('user not found')
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
