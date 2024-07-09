# API SUPERMERCADO

## Instalación
En la terminal escribir lo siguiente para instalar las dependencias necesarias.
```shell
npm i
```
Crear un archivo ".env" tomando como ejemplo el ".env-example".

## Ejecución
Para ejecutar en modo desarrollo
```shell
npm run dev
```

Para ejecutar en modo producción
```shell
node index.js
```
## Postman
| Objetivo | Método | Ruta |
| :-------: | :-: | :---: |
| Obtener todos los productos | GET | http://localhost:3001/supermercado |
| Obtener un producto por su código | GET | http://localhost:3001/supermercado/codigo/:codigo |
| Filtrar productos por su nombre | GET | http://localhost:3001/supermercado/nombre/:nombre |
| Agregar un nuevo producto (*) | POST | http://localhost:3001/supermercado |
| Modificar el precio de un producto | PATCH | http://localhost:3001/supermercado/codigo/:codigo |
| Eliminar un producto | DELETE | http://localhost:3001/supermercado/codigo/:codigo |


(*)La estructura del producto a agregar debe ser la siguiente:
```json
{
"codigo": 3456,
"nombre": "Mantequilla",
"precio": 3.99,
"categoria": "Lácteos"
},
```
Por defecto MongoDB se ocupa de crear un índice general para cada colección llamándolo "_id".


