const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');

// creo una funcion que contendra todas las rutas de la app
function routerApi(app) {

  // instancio el Router de Express
  const router = express.Router();
  // indico un sufijo a usar en todas las rutas
  app.use('/api/v1', router);
  // Asigno las rutas correspondiente al recurso(path) 'products'
  router.use('/products', productsRouter);
  // Asigno las rutas correspondiente al recurso(path) 'categories'
  router.use('/categories', categoriesRouter);
  // Asigno las rutas correspondiente al recurso(path) 'users'
  router.use('/users', usersRouter);
  // Asigno las rutas correspondiente al recurso(path) 'orders'
  router.use('/orders', orderRouter);

}

module.exports = routerApi;
