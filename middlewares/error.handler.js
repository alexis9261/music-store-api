// Este es un middleware global que se aplicara a todas las rutas

// Middleware que solo se encarga de capturar cualquier error, por si ocurrio en algun momento del codigo, no valida nada
function logErrors (err, req, res, next) {
  // muestro el error en consola
  console.error(err);
  // Al retornar la funcion next con un error en el argumento, esto le convierte en un middleware de tipo error
  next(err);
}


function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler }
