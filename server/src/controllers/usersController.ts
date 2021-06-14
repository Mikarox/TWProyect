import bcryptjs from 'bcryptjs';

import { Request, Response } from 'express';
import { transporter } from './../config/mailer';
import fs from 'fs';

import pool from '../database';
//Se definen lo que realizarán las peticiones 
class UserController {
  //Se ejecuta la query para listar todos los usuarios
  public async list(req: Request, res: Response): Promise<void> {
    await pool.query('SELECT * FROM users', function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  }
  //Se ejecuta la query para mostrar un usuario por su id
  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    await pool.query('SELECT * FROM users WHERE ID_USR = ?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'Usuario no encontrado en getone' });
    });
  }
  //Se ejecuta la query para registrar un usuario
  public async register(req: Request, res: Response): Promise<void> {
    if (req.file) { //Si la foto existe 
      req.body.PHOTO = req.file.path; //Se agrega la dirección de la foto
    }

    let page = `<b>deveria enviar un botton para </b> <br> 
    <a href="http://localhost:4200/verify/` + req.body.EMAIL + `">verificar cuenta</a>
    `;
    if(req.body.IS_REG == "0"){
      await transporter.sendMail({
        from: '"Verify Acount👻<' + req.body.NAME + " " +  req.body.LASTNAME  +' Hospital@isc6to.com>"', // sender address
        to: req.body.EMAIL , // list of receivers
        subject: "Hello, did you create a acount? ✔", // Subject line
        text: "Please verify account", // plain text body
        html: page, // html body
      });     
    }
 
    req.body.USR_PASSW= await bcryptjs.hash(req.body.USR_PASSW, 8); //Encriptando la contraseña
    await pool.query('INSERT INTO users set ?', [req.body], function(err, result, fields) {
      if (err) throw err;
      res.json({ message: 'Usario registrado', id: result.insertId });
    });
    
  }
  //Se ejecuta la query para actualizar un usuario por su id
  public async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Se obtiene primero la ruta de la foto actual para eliminarla
    await pool.query('SELECT PHOTO FROM users WHERE ID_USR = ?', [id],async function(err, result, fields) {
      if (err) throw err;
      if(result[0]){ //Si existe el usairo
        if(result[0].PHOTO){//Si existe la foto
          if(req.file){//si se envió una foto
            const pathPhoto = result[0].PHOTO; //Se alamacena la ruta de la foto
            fs.unlinkSync(pathPhoto); //Se elimina la foto  
          }  
        }
        if(req.file){ //Si la foto existe 
          req.body.PHOTO = req.file.path; //Se agrega la dirección de la foto
        }else{
          req.body.PHOTO = result[0].PHOTO; //Se queda con la foto actual
        }
        req.body.USR_PASSW= await bcryptjs.hash(req.body.USR_PASSW, 8); //Encriptando la contraseña
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
  public async delete(req: Request, res: Response): Promise<any> {
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
      res.status(404).json({ message: 'Usuario no encontrado en delete' });
    });
  }

  //Se ejecuta la query para validar un usuario por su email
  public async validate(req: Request, res: Response): Promise<any> {
    const { email } = req.params;
    await pool.query('UPDATE users set IS_REG="1" WHERE EMAIL = ?', [email], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        return res.json({ message: 'El usuario fue validado correctamente' });
      }
      res.status(404).json({ message: 'Correo INVALIDO, NO VALIDADO' });
    });
  }

  //Se ejecuta la query para restablecer la contrasna de  un usuario por su email
  public async recoverPass(req: Request, res: Response): Promise<any> {
    console.log('USR_NAME: '+req.body.USR_NAME);
    console.log('EMAIL: '+req.body.EMAIL);

    //validate 
    
    
  }

  public async login(req: Request, res: Response): Promise<any> {

    await pool.query('SELECT * FROM users WHERE USR_NAME = ? ', [req.body.USR_NAME], function (err, result, fields) {
      if (err) throw err;
      if (result.length == 1) {

        if(bcryptjs.compareSync(req.body.USR_PASSW, result[0].USR_PASSW) ){
          return res.json(result[0]);
        }else {
          res.status(404).json({message: 'Credenciales incorrectas'});
        }
      }
      else{
        res.status(404).json({message: 'existen varios =='}); 
      }
      res.status(404).json({ message: 'Credenciales incorrectas' });
    });
    
  }

  public async existUsrName(req: Request, res: Response): Promise<any>{
    if(req.params){
      const { usrName } = req.params;
      await pool.query('SELECT * FROM users WHERE USR_NAME = ?', [usrName],function(err, result, fields) {
        if (err) throw err;
        if(result.length>0){
          return res.json({message: 'Existe'});
        }
        return res.json({message: 'No existe'});
      })  
    }
    else{
      return res.json({message: 'No existe'});
    }
  }
  public async existUsrEmial(req: Request, res: Response): Promise<any>{
    if(req.params){
      const { usrEmail } = req.params;
      await pool.query('SELECT * FROM users WHERE EMAIL = ?', [usrEmail],function(err, result, fields) {
        if (err) throw err;
        if(result.length>0){
          return res.json({message: 'Existe'});
        }
        return res.json({message: 'No existe'});
      })  
    }
    else{
      return res.json({message: 'No existe'});
    }
  }
}

export const usersController = new UserController();