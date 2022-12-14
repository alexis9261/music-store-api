const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class CustomerService {
  constructor() {}

  /**
   * @description find all customers
   * @param {object} body - body request
   * @returns {object} - User
   */
  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  /**
   * @description find all customers
   * @returns {collection} - { fields, values, tuples }
   */
  async find() {
    // Mediante el modelo User obtengo todos los registros
    const response = await models.Customer.findAll({
      include: ['user']
    });
    // Retorno la data
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if(!customer)
      throw boom.notFound('user not found')
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
