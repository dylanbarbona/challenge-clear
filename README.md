## Requisitos

[Node](https://nodejs.org/) version >= 12, excepto por la v13. <br/>
[Nest](https://github.com/nestjs/nest) framework. <br/>
[MongoDB](https://www.mongodb.com/) version >= v4.0.0

## Instalación

```bash
$ cp .env.copy .env
```

Reemplazar las variables de entorno correspondientes y ejecutar 

```bash
$ npm install
$ npm run start:dev
```

## Ejecutar la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Estructura del projecto

Este proyecto está estructurado en módulos. En este caso, el módulo Client contiene un archivo .module.ts encargado de la configuración del mismo.
Además, cuenta con una organización de tres capas que se encuentran en carpetas llamadas "Domain", "Application" e "Infrastructure"

El dominio contiene las entidades vinculadas a este módulo, junto con las interfaces de los repositorios para brindar operaciones a ejecutar sobre dichas entidades.

La capa de aplicación corresponde a las operaciones que realizan consumidores externos, ya sea por un controller que brinde operaciones mediante una API REST o servicios que pueden utilizarse en otros módulos. Además cuenta con lo necesario para realizar validaciones de las request de los controllers o el formato de las responses.

La capa de infraestructura contiene las implementaciones de las interfaces definidas en el dominio, en este caso de los repositorios que utilizan la base de datos MongoDB. La configuración de que repositorio utilizar es configurable al importar el módulo.

La documentación de los endpoints en Swagger se puede acceder desde /api