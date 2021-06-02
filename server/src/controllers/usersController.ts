import bcryptjs  from 'bcryptjs';

import { Request, Response } from 'express';

import pool from '../database';
//Se definen lo que realizarán las peticiones 
class UserController{
  //Se ejecuta la query para listar todos los usuarios
  public async list (req: Request, res: Response): Promise<void>{
    await pool.query('SELECT * FROM users',function(err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  }
  //Se ejecuta la query para mostrar un usuario por su id
  public async getOne (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    await pool.query('SELECT * FROM users WHERE ID_USR = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.length>0){
        return res.json(result[0]);
      }
      res.status(404).json({message: 'Usuario no encontrado'});
    });
  }
  //Se ejecuta la query para registrar un usuario
  public async register (req: Request, res: Response): Promise<void>{
    if(req.file){ //Si la foto existe 
      req.body.PHOTO = req.file.path; //Se agrega la dirección de la foto
    } 
    req.body.USR_PASSW= await bcryptjs.hash(req.body.USR_PASSW, 8); //Encriptando la contraseña
    await pool.query('INSERT INTO users set ?', [req.body]);
    res.json({message: 'Usario registrado'});
  }
  //Se ejecuta la query para actualizar un usuario por su id
  public async update (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    await pool.query('UPDATE users set ? WHERE ID_USR = ?', [req.body, id],function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){
        return res.json({message: 'El usuario fue actualizado'});
      }
      res.status(404).json({message: 'Usuario no encontrado'});
    });
  }
  //Se ejecuta la query para eliminar un usuario por su id
  public async delete (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE ID_USR = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){
        return res.json({message: 'El usuario fue eliminado'});
      }
      res.status(404).json({message: 'Usuario no encontrado'});
    });
  }
}

export const usersController = new UserController();