import bcryptjs  from 'bcryptjs';

import { Request, Response } from 'express';
import { transporter } from './../config/mailer';

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
      res.status(404).json({message: 'Usuario no encontrado en getone'});
    });
  }
  //Se ejecuta la query para registrar un usuario
  public async register (req: Request, res: Response): Promise<void>{
    if(req.file){ //Si la foto existe 
      req.body.PHOTO = req.file.path; //Se agrega la dirección de la foto
    }   

    let page = `<b>deveria enviar un botton para </b> <br> 
    <a href="http://localhost:4200/verify/` + req.body.EMAIL + `">verificar cuenta</a>
    `;

    await transporter.sendMail({
      from: '"Verify Acount👻<' + req.body.NAME + " " +  req.body.LASTNAME  +' Hospital@isc6to.com>"', // sender address
      to: req.body.EMAIL , // list of receivers
      subject: "Hello, did you create a acount? ✔", // Subject line
      text: "Please verify account", // plain text body
      html: page, // html body
    });


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
      res.status(404).json({message: 'Usuario no encontrado en update'});
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
      res.status(404).json({message: 'Usuario no encontrado en delete'});
    });
  }

  //Se ejecuta la query para registrare un usuario por su email
  public async validate (req: Request, res: Response): Promise<any>{
    const {email} = req.params;
    await pool.query('UPDATE users set IS_REG="1" WHERE EMAIL = ?', [email] ,function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){
        return res.json({message: 'El usuario fue validado correctamente'});
      }
      res.status(404).json({message: 'Correo INVALIDO, NO VALIDADO'});
    });
  }
}

export const usersController = new UserController();