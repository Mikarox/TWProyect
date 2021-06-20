import { Router } from 'express';

import { indexController } from '../controllers/indexController';

class IndexRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/', indexController.msj); 
  }
}

const indexRoutes = new IndexRoutes;
export default indexRoutes.router;