import bcryptjs  from 'bcryptjs';

import { Request, Response } from 'express';
import fs from 'fs';

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
    //Se obtiene primero la ruta de la foto actual para eliminarla
    await pool.query('SELECT PHOTO FROM users WHERE ID_USR = ?', [id],async function(err, result, fields) {
      if (err) throw err;
      if(result[0]){ //Si existe el usairo
        if(result[0].PHOTO){//Si existe la foto
          const pathPhoto = result[0].PHOTO; //Se alamacena la ruta de la foto
          fs.unlinkSync(pathPhoto); //Se elimina la foto 
        }
        if(req.file){ //Si la foto existe 
          req.body.PHOTO = req.file.path; //Se agrega la dirección de la foto
        }else{
          req.body.PHOTO = '';
        }
        //Se ejecuta la query para actualizar al usario
        await pool.query('UPDATE users set ? WHERE ID_USR = ?', [req.body, id],function(err, result, fields) {
          if (err) throw err;
          if(result.affectedRows==1){
            res.json({message: 'El usuario fue actualizado'});
          }else{
            res.status(404).json({message: 'Usuario no encontrado'});
          }
        });
      }else{
        res.status(404).json({message: 'Usuario no encontrado'});
      }
    }); 
  }
  //Se ejecuta la query para eliminar un usuario por su id
  public async delete (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    //Se obtiene primero la ruta de la foto para eliminarla
    await pool.query('SELECT PHOTO FROM users WHERE ID_USR = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result[0]){ //Si existe el usairo
        if(result[0].PHOTO){//Si existe la foto
          const pathPhoto = result[0].PHOTO; //Se alamacena la ruta de la foto
          fs.unlinkSync(pathPhoto); //Se elimina la foto 
        }
      }
    });
    //Consulta para eleiminar al usuairo 
    await pool.query('DELETE FROM users WHERE ID_USR = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){
        res.json({message: 'El usuario fue eliminado'});
      }
      else{
        res.status(404).json({message: 'Usuario no encontrado'}); 
      }
    });
  }
}

export const usersController = new UserController();