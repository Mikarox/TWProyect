import { Request, Response } from 'express';

import pool from '../database';
import fs from 'fs';

//Se definen lo que realizarán las peticiones 
class DiseasesController{
  //Se ejecuta la query para listar todas las enfermedades
  public async list (req: Request, res: Response): Promise<void>{
    await pool.query('SELECT * FROM diseases',function(err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  }
  //Se ejecuta la query para mostrar una enfermedad por su id
  public async getOne (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    await pool.query('SELECT * FROM diseases WHERE ID_DISEASE = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.length>0){
        return res.json(result[0]);
      }
      res.status(404).json({message: 'Enfermedad no encontrada'});
    });
  }
  //Se ejecuta la query para registrar una enfermedad
  public async register (req: Request, res: Response): Promise<void>{
    if(req.file){ //Si la imagen existe 
      req.body.IMAGE = req.file.path; //Se agrega la dirección de la imagen
    } 
    await pool.query('INSERT INTO diseases set ?', [req.body]);
    res.json({message: 'Enfermedad registrada'});
  }
  //Se ejecuta la query para actualizar una enfermedad por su id
  public async update (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    //Se obtiene primero la ruta de la imagen actual para eliminarla
    await pool.query('SELECT IMAGE FROM diseases WHERE ID_DISEASE = ?', [id],async function(err, result, fields) {
      if (err) throw err;
      if(result[0]){ //Si existe la enfermedad
        if(result[0].IMAGE){//Si existe la imagen
          const pathImage = result[0].IMAGE; //Se alamacena la ruta de la imagen
          fs.unlinkSync(pathImage); //Se elimina la imagen
        }
        if(req.file){ //Si la imagen existe 
          req.body.IMAGE = req.file.path; //Se agrega la dirección de la imagen
        }else{
          req.body.IMAGE = '';
        }
        //Se ejecuta la query para actualizar la enfermedad
        await pool.query('UPDATE diseases set ? WHERE ID_DISEASE = ?', [req.body, id],function(err, result, fields) {
          if (err) throw err;
          if(result.affectedRows==1){
            res.json({message: 'La enfermedad fue actualizada'});
          }else{
            res.status(404).json({message: 'Enfermedad no encontrada'});
          }
        });
      }else{
        res.status(404).json({message: 'Enfermedead no encontrada'});
      }
    }); 
  }
  //Se ejecuta la query para eliminar una enfermedad por su id
  public async delete (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    //Se obtiene primero la ruta de la imagen para eliminarla
    await pool.query('SELECT IMAGE FROM diseases WHERE ID_DISEASE = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result[0]){ //Si existe la enefermedad 
        if(result[0].IMAGE){//Si existe la imagen
          const pathImage = result[0].IMAGE; //Se alamacena la ruta de la imagen
          fs.unlinkSync(pathImage); //Se elimina la imagen
        }
      }
    });
    // Consulta para eleiminar a la enfermedad
    await pool.query('DELETE FROM diseases WHERE ID_DISEASE = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){
        res.json({message: 'La enfermedad fue eliminada'});
      }
      else{
        res.status(404).json({message: 'Enfermedad no encontrada'}); 
      }
    });
  }
}

export const diseasesController = new DiseasesController();


