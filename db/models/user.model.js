const { Model, DataTypes, Sequelize } = require('sequelize')

// el nombre que tendra la tabla
const USER_TABLE = 'users';

// Definimos la estrucutra que tendra la tabla 'users'
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}

// creamos el modelo User que extiende de la clase Model de sequelize
class User extends Model {
  static associate(models){
    // Relacion uno a uno con la tabla customer
    this.hasOne(models.Customer, {
      // el alias de la relacion
      as: 'customer',
      // la llave foranea de la relacion en la tabla customer
      foreignKey: 'userId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }
