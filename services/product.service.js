const faker = require('faker');
const { Op } = require('sequelize')
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductsService {

  // private offset = 0;
  // private limit = 20;

  constructor(){
    this.products = [];
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {

    const options = {
      include: ['category'],
      where:{}
    }

    // obtengo el offset y limit de la paginacion
    const { offset, limit } = query
    // en caso de qeu vengan en la url, los agrego a options para filtrar la busqueda
    if(offset && limit ){
      options.offset = offset
      options.limit = limit
    }else{
      options.offset = 0
      options.limit = 20
    }

    // Verifico si el prametro 'price' fue enviado por url, este parametro servira para bscar los products con precio igual al valor
    const { price } = query
    if(price){
      options.where.price = price
    }

    // validar entre un rango de precios
    const { price_min, price_max } = query
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      }
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
      offset: 0,
      limit: 10
    });

    if(!product)
      throw boom.notFound('product not found')

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return product;
  }

}

module.exports = ProductsService;
