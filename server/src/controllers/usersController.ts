import { Request, Response } from 'express';

import pool from '../database';

class UserController{
  public list (req: Request, res: Response){
    res.json({text: 'Listando usuario'});
  }
  public getOne (req: Request, res: Response){
    res.json({text: 'Mostrando usuario '+req.params.id});
  }
  public register (req: Request, res: Response){
    res.json({text: 'Registrando usario'});
  }
  public update (req: Request, res: Response){
    res.json({text: 'Actualizando usario '+req.params.id});
  }
  public delete (req: Request, res: Response){
    res.json({text: 'Eliminando usuario '+req.params.id});
  }
}

export const usersController = new UserController();