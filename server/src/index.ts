import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { Server } from "socket.io";
import { createServer } from "http";
import usersRoutes from './routes/usersRoutes';
import diseasesRoutes from './routes/diseasesRoutes';
import patientsRoutes from './routes/patientsRoutes';
import indexRoutes from './routes/indexRoutes';

class MyServer{
  public app: Application; //Se define el servidor en la variable app
  constructor(){
    this.app=express(); //Se ejecuta el servidor con la función express()
    this.config(); //Se ejecuta el método de configuraciones del servidor
    this.routes(); //Se ejecuta el método de rutas (peticiones)
  }
  //Métodos
  config(): void{
    this.app.set('port', process.env.PORT || 3000); //Se establece el puerto dende se aloja o el 3000
    this.app.use(morgan('dev')); //Muestra las peticiones por consola
    this.app.use(cors()); 
    this.app.use(express.json());//Permite leer archivos JSON
    this.app.use(express.urlencoded({extended: false}));
    this.app.use('/uploads', express.static(path.resolve('uploads'))); //El navegador puede acceder a uploads
  }
  routes(): void{
    this.app.use('/api',indexRoutes)
    this.app.use('/api/users',usersRoutes) //ruta para trabajar con la tabla usrs de la base de datos
    this.app.use('/api/diseases',diseasesRoutes) //ruta para trabajar con la tabla diseases de la base de datos
    this.app.use('/api/patients',patientsRoutes); //ruta para trabajar con la tabla patients y medical_ history
  }
  start(): void{ //El servidor se pone a la escucha
    this.app.listen(this.app.get('port'), ()=> {
      console.log('Server on port',this.app.get('port'));
    });
  }
}
//Se crea y ejecuta el servidor
const server = new MyServer();
server.start();

// //Se crea un nuevo servidor http que trabajará con los websockets
// const httpServer = createServer(server.app);
// const server2 = require('http').Server(server.app);
// const io = require('socket.io')(server2);


// io.on('connection', (socket: any) => {
//   const idHandShake = socket.id;
//   // const msj = socket.handshake.query;
//   console.log(`Hola dispositivo: ${idHandShake}`)
// });

