import { Request, Response } from 'express';

import pool from '../database';

//Se definen lo que realizarán las peticiones 
class PatientsController{
  //Se ejecuta la query para listar todos los pacientes
  public async list (req: Request, res: Response): Promise<void>{
    await pool.query('SELECT patients.ID_USR, SEX, AGE, HEIGHT, WEIGHT, PRESSURE, BREATHING, PULSE, TEMPERATURE, GROUP_CONCAT(medical_history.ILLNESS) AS ILLNESS FROM patients LEFT JOIN medical_history ON patients.ID_USR=medical_history.ID_USR GROUP BY patients.ID_USR',function(err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  }
  //Se ejecuta la query para mostrar un paciente por su id
  public async getOne (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    await pool.query('SELECT patients.ID_USR, SEX, AGE, HEIGHT, WEIGHT, PRESSURE, BREATHING, PULSE, TEMPERATURE, GROUP_CONCAT(medical_history.ILLNESS) AS ILLNESS FROM patients LEFT JOIN medical_history ON patients.ID_USR=medical_history.ID_USR WHERE patients.ID_USR = ? GROUP BY patients.ID_USR', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.length>0){
        return res.json(result[0]);
      }
      res.status(404).json({message: 'Pacinte no encontado'});
    });
  }
  //Se ejecuta la query para registrar un paciente
  public async register (req: Request, res: Response): Promise<void>{
    var HISTORY;
    if(req.body.HISTORY){ //Si se enviaron padecimintos
      HISTORY=req.body.HISTORY; //Almacenamos el array de enfermedades en una variable
      delete req.body.HISTORY; //Se elimina el array de enefermedades para la primera consulta
    }
    //Se realiza la consulta de registro en la tabla patients 
    await pool.query('INSERT INTO patients set ?', [req.body]);
    if(HISTORY){ //Si se enviaron padecimintos
      //Consulta para insertar los padecimintos en la tabla de medical_history
      for(var i=0; i<HISTORY.length; i++){
        await pool.query("INSERT INTO medical_history(ID_USR, ILLNESS) VALUES ('"+req.body.ID_USR+"', '"+HISTORY[i]+"')");
      }
    }
    res.json({message: 'Pacinte registrado '});
  }
  //Se ejecuta la query para actualizar un paciente por su id
  public async update (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    var HISTORYUP: any;
    if(req.body.HISTORY){ //Si se enviaron padecimintos
      HISTORYUP=req.body.HISTORY; //Almacenamos el array de enfermedades en una variable
      delete req.body.HISTORY; //Se elimina el array de enefermedades para la primera consulta
    }
    await pool.query('UPDATE patients set ? WHERE ID_USR = ?', [req.body, id],async function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){//Se se realizó actualización
        if(HISTORYUP){ //Si se enviaron padecimintos
          //Se elimina los registros de la tabla medical_history para volver a insertarlos con la nueva información 
				  await pool.query('DELETE FROM medical_history WHERE ID_USR = ?',[id],async function(err, result, fields) {
            //Consulta para insertar los padecimintos en la tabla de medical_history
            for(var i=0; i<HISTORYUP.length; i++){
              await pool.query("INSERT INTO medical_history(ID_USR, ILLNESS) VALUES ('"+id+"', '"+HISTORYUP[i]+"')");
            }
          });
        }
        res.json({message: 'El paciente fue actualizado'});
      }else{
        res.status(404).json({message: 'Paciente no encontrado'});
      }
    });
  }
  //Se ejecuta la query para eliminar un paciente por su id
  public async delete (req: Request, res: Response): Promise<any>{
    const { id } = req.params;
    await pool.query('DELETE FROM patients WHERE ID_USR = ?', [id],function(err, result, fields) {
      if (err) throw err;
      if(result.affectedRows==1){
        res.json({message: 'El paciente fue eliminado'});
      }
      else{
        res.status(404).json({message: 'Paciente no encontrado'}); 
      }
    });
  }
}

export const patientsController = new PatientsController();