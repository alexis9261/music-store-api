const { Model, DataTypes, Sequelize } = require('sequelize')

const { CUSTOMER_TABLE } = require('./customer.model')

// el nombre que tendra la tabla
const ORDER_TABLE = 'orders';

// Definimos la estrucutra que tendra la tabla 'users'
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  customerId: {
    field: 'customer_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

// creamos el modelo Product que extiende de la clase Model de sequelize
class Order extends Model {

  static associate(models){
    this.belongsTo(models.Customer,{ as: 'customer' });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order }
