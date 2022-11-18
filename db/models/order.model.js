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
  },
  // Este sera un campo virtual que se calculara directamente al momento de hacer la peticion a DB, no es una columna de la tabla
  total: {
    // con VIRTUAL indicamos a sequelize que este campo no sera una columan de la tabla, sera una columna virtual
    type: DataTypes.VIRTUAL,
    get() {
      // Si el campo 'items' (correspondiente a la relacion muchos a muchos), qeu es un array, tiene elementos, entonces =>
      if (this.items.length > 0) {
        // retorno un valor, recorro el array y lo reduzco a un valor, que sera la suma de la multiplicacion del precio de cada elemento por la cantidad
        return this.items.reduce((total, item) => {
          // La cantidad 'quantity' se encuentra el la tabla intermedia, por lo que es necesario usar la relacion para acceder al campo
          return total + (item.price * item.OrderProduct.quantity);
          // 0 indica que la variable 'total' empieza con valor cero
        }, 0);
      }
      return 0;
    },
  },
}

// creamos el modelo Product que extiende de la clase Model de sequelize
class Order extends Model {

  static associate(models){
    this.belongsTo(models.Customer,{ as: 'customer' });

    // Relacion muchos a muchos con products
    this.belongsToMany(models.Product,{
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
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
