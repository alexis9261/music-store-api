const { ValidationError } = require('sequelize')
// Este es un middleware global que se aplicara a todas las rutas

// Middleware que solo se encarga de capturar cualquier error, por si ocurrio en algun momento del codigo, no valida nada
function logErrors (err, req, res, next) {
  // muestro el error en consola
  console.error(err);
  // Al retornar la funcion next con un error en el argumento, esto le convierte en un middleware de tipo error
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function sequelizeErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {

    const errors = err.errors
    const messageError = errors.map( (error) => error.message )

    res.status(409).json({
      message: messageError
    });

  }
  next(err);
}

// Middelware que captura cualquier error, lo ideal es que este al final implementado en app (ver index.js)
// no tiene el llamado al metodo next() porque se supone debe ser el ultimo filtro y no debe permitir avanzar
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err,
  });
}


module.exports = { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler }
