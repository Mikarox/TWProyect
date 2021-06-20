import { Router } from 'express';

import { diseasesController } from '../controllers/diseasesController';

import multer from '../libs/multerDiseases';

//Ruta para trabajar con la tabla diseases de la base de datos
class DiseasesRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/', diseasesController.list); //listar todos las enfermedades
    this.router.get('/:id', diseasesController.getOne); //mostrar una enfermedad por su id
    this.router.post('/', multer.single('IMAGE'),diseasesController.register); //registrar una enfermedad
    this.router.put('/:id',multer.single('IMAGE'), diseasesController.update); //actualizar una enfermedad por su id
    this.router.delete('/:id', diseasesController.delete); //eliminar una enfermedad por su id
  }
}

const diseasesRoutes = new DiseasesRoutes;
export default diseasesRoutes.router;