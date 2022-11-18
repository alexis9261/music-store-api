const { Model, DataTypes, Sequelize } = require('sequelize')

const { ORDER_TABLE } = require('./order.model')
const { PRODUCT_TABLE } = require('./product.model')

// el nombre que tendra la tabla
const ORDER_PRODUCT_TABLE = 'orders_products';

// Definimos la estrucutra que tendra la tabla 'users'
const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

// creamos el modelo Product que extiende de la clase Model de sequelize
class OrderProduct extends Model {

  static associate(models){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct }
