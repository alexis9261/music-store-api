# Node App

Proyecto correspondiente al Curso de Backend con Node.js: Base de Datos con PostgreSQL - Platzi
https://platzi.com/cursos/backend-nodejs-postgres/


## Estructura de carpetas

### ./libs
  Esta carpeta se encarga de la conexion a terceros, Bases de datos, api's, etc.

### ./services
  Directamente la logica de negocios, osea el codigo javascript que cuenta con los algoritmos propios de la app


### comands

### Creamos un archivo de variables de entorno a partir del archivo de ejemplo
```
cp .env.example .env
```

### Configuramos el archivo con los datos para conexion a BD Postgres
DB_NAME=db_name
DB_USER=user_db
DB_PASSWORD=password

#### Correr los contenedores para Base de datos, agregando el nombre del archivo de variables de entorno
```
docker-compose --env-file [dir_name] up -d
```

#### Correr la app node
```
npm run dev
```

## Migraciones

### Crear un archivo de migracion
npm run migrations:generate migracion_name_file

### ejcutar las migraciones
npm run migrations:run

### revertir(rollback) de la ultima migracion ejecutada
npm run migrations:revert

### eliminar todas las tablas y datos de BD
npm run migrations:delete
