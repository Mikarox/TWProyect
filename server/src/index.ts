import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import usersRoutes from './routes/usersRoutes';
import diseasesRoutes from './routes/diseasesRoutes';
import patientsRoutes from './routes/patientsRoutes';

class Server{
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
    this.app.use('/api/users',usersRoutes) //ruta para trabajar con la tabla usrs de la base de datos
    this.app.use('/api/diseases',diseasesRoutes) //ruta para trabajar con la tabla diseases de la base de datos
    this.app.use('/api/patients',patientsRoutes); //ruta para trabajar con la tabla patients y medical_ history
  }
  start(): void{ //El servidor se pone a la escucha
    this.app.listen(3000,'0.0.0.0');
  }
}
//Se crea y ejecuta el servidor
const server = new Server();
server.start();
