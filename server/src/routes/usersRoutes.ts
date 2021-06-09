import { Router } from 'express';

import { usersController } from '../controllers/usersController';

import multer from '../libs/multerUser';

//Ruta para trabajar con la tabla usrs de la base de datos
class UsersRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/', usersController.list); //listar todos los usuarios
    this.router.get('/:id', usersController.getOne); //mostrar un usuario por su id
    this.router.post('/', multer.single('PHOTO'),usersController.register); //registrar un usuario
    this.router.post('/forgotpass', usersController.recoverPass);
    this.router.get('/verify/:email', usersController.validate); //valida el usuario en la base de datos
    this.router.get('/verify-userName/:usrName', usersController.existUsrName); //Validar el nombre de usario
    this.router.get('/verify-userEmail/:usrEmail', usersController.existUsrEmial); //Validar el correo de usario
    this.router.put('/:id',multer.single('PHOTO'), usersController.update); //actualizar un usuario por su id
    this.router.delete('/:id', usersController.delete); //eliminar un usuario por su id
    this.router.post('/login',usersController.login);
  }
}

const usersRoutes = new UsersRoutes;
export default usersRoutes.router;