const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

// Importo los middlewares
const { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler } = require('./middlewares/error.handler');

// inicializo la app con express
const app = express();
// Creo una variable que contendra la variable de entorno PORT, en caso de no existir se asigna 3000 por default
const port = process.env.PORT || 3000;

app.use(express.json());

// Configuro CORS para permitir peticiones HTTP desde un listado de ip externas
// Creo el listado de IP's que podran hacer peticiones HTTP al servidor
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
// Creo el objeto de configuracion de CORS
const options = {
  // Indico el origen que aceptara, recibe un callback
  origin: (origin, callback) => {
    // Pregunto si el origen(IP) que esta haciendo la solicitud se encuentra en el listado
    if (whitelist.includes(origin) || !origin) {
      // Retorno un error null y true en respuesta, indicando que todo ha ido bien
      callback(null, true);
    } else {
      // Respondo directamente un error indicando que la IP tiene permisos para hacer peticiones HTTP al servidor
      callback(new Error('no permitido'));
    }
  }
}
// Aplico las opciones a CORS y al mismo tiempo aplico CORS a la app
app.use(cors(options));

// Creo una ruta home
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

// Creo otra custom ruta
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// aplico la app al router
routerApi(app);

// Aplico los middelwares de error a toda la app, y por lo tanto a todas las rutas
app.use(logErrors);
app.use(boomErrorHandler);
app.use(sequelizeErrorHandler);
app.use(errorHandler);

// indico el puerto donde estara escuchando la app
app.listen(port, () => {
  // envio un mensaje por consola indicando que todo va bien
  console.log('Mi port' +  port);
});
