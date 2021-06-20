import { Request, Response } from 'express';


//Se definen lo que realizarán las peticiones 
class IndexController{
  public async msj (req: Request, res: Response): Promise<void>{
    res.send('Hello World!');
  }
}

export const indexController = new IndexController();


