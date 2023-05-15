# Next.js OpenJira App

para correr localmente, se necesita la base de datos

```
docker-compose up -d

```
 //docker-compose up -d es para que no funcione de manera coordinada con la consola para que se despegue sin necesidad de que este abierta la consola y cancele mi imagen
* El -d, significa __detached__


Mongo URL Local:
```
mongodb://localhost:27017/entriesdb
```

## CONfigurar las variables de entorno 
Renombrar el archivo __.env.template__ a __.env__ 

## llenar la base de datos con información de pruebas

llamara :
```
    http://localhost:3000/api/seed
```