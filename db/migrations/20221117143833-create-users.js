'use strict';
// Importo el nombre de la tabla a crear y la estructura(schema) que tendra la tabla
const { USER_TABLE } = require('./../models/user.model')
const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  // este metodo se ejecuta al correr la migracion
  async up (queryInterface, Sequelize) {
    // mediante queryInterface creamos la tabla, recibe el nombre de la tabla a crear y la estructura que tendra
    await queryInterface.createTable(USER_TABLE,{
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
  },

  // este metodo se ejecuta al hacer rollback de la migracion
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
