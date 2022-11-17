const { Model, DataTypes, Sequelize } = require('sequelize')

// el nombre que tendra la tabla
const CATEGORY_TABLE = 'categories';

// Definimos la estrucutra que tendra la tabla 'users'
const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}

// creamos el modelo Category que extiende de la clase Model de sequelize
class Category extends Model {

  static associate(models){
    // Relacion uno a muchos con los productos
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category }
