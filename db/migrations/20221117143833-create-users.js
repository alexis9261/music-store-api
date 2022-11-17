'use strict';
// Importo el nombre de la tabla a crear y la estructura(schema) que tendra la tabla
const { USER_TABLE, UserSchema } = require('./../models/user.model')

module.exports = {
  // este metodo se ejecuta al correr la migracion
  async up (queryInterface, Sequelize) {
    // mediante queryInterface creamos la tabla, recibe el nombre de la tabla a crear y la estructura que tendra
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  // este metodo se ejecuta al hacer rollback de la migracion
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
