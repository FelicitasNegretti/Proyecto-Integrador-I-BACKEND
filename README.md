# API SUPERMERCADO
Integrantes del proyecto integrador: 
- Negretti Felicitas
- Negretti Milagros

Para realizar este proyecto utilizamos Visual Studio Code, Express.js, Mongo DB y Postman.

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
Para leer, crear, modificar o eliminar un producto deberá utilizar Postman. En la siguiente tabla se detalla el método y la URL(ruta) a usar para cada objetivo: 
| Objetivo | Método | Ruta |
| :-------: | :-: | :---: |
| Obtener todos los productos | GET | http://localhost:3001/supermercado |
| Obtener un producto por su código | GET | http://localhost:3001/supermercado/codigo/:codigo |
| Filtrar productos por su nombre completo o parcial | GET | http://localhost:3001/supermercado/nombre/:nombre |
| Agregar un nuevo producto (*) | POST | http://localhost:3001/supermercado |
| Modificar el precio de un producto | PATCH | http://localhost:3001/supermercado/codigo/:codigo |
| Eliminar un producto | DELETE | http://localhost:3001/supermercado/codigo/:codigo |


(*)La estructura del producto a agregar debe ser la siguiente:
```json
{
"nombre": "Mantequilla",
"precio": 3.99,
"categoria": "Lácteos"
},
```
Si solo se quiere modificar una parte del registro no hace falta escribir la estructura completa, si no solo la propiedad a modificar con su nuevo valor. Además si es necesario se puede agregar una nueva propiedad al objeto o documento.

Cuando se agregue un nuevo producto a la base de datos automaticamente se le asignará un código al azar que lo identifique(id).

Por defecto MongoDB se ocupa de crear un índice general para cada colección llamándolo "_id".


