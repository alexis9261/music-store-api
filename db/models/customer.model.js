const { Model, DataTypes, Sequelize } = require('sequelize')

const { USER_TABLE } = require('./user.model')
// el nombre que tendra la tabla
const CUSTOMER_TABLE = 'customers';

// Definimos la estrucutra que tendra la tabla 'users'
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'last_name',
    defaultValue: null,
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: null,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: true,
    unique: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

// creamos el modelo User que extiende de la clase Model de sequelize
class Customer extends Model {

  static associate(models){
    // relacion con el modelo User
    this.belongsTo(models.User, {as: 'user'})

    // Realcion uno a muchos, un cliente puede tener muchas ordenes
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}


module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer }
