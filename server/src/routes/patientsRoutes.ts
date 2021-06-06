import { Router } from 'express';

import { patientsController } from '../controllers/patientsController';


//Ruta para trabajar con la tabla patients y medical_ history de la base de datos
class PatientsRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/', patientsController.list); //listar todos los pacientes
    this.router.get('/:id', patientsController.getOne); //mostrar un paciente por su id
    this.router.post('/',patientsController.register); //registrar un paciente
    this.router.put('/:id', patientsController.update); //actualizar un paciente por su id
    this.router.delete('/:id', patientsController.delete); //eliminar un paciente por su id
  }
}

const patientsRoutes = new PatientsRoutes;
export default patientsRoutes.router;