"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientsController = void 0;
const database_1 = __importDefault(require("../database"));
//Se definen lo que realizarán las peticiones 
class PatientsController {
    //Se ejecuta la query para listar todos los pacientes
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT patients.ID_USR, SEX, AGE, HEIGHT, WEIGHT, PRESSURE, BREATHING, PULSE, TEMPERATURE, GROUP_CONCAT(medical_history.ILLNESS) AS ILLNESS FROM patients LEFT JOIN medical_history ON patients.ID_USR=medical_history.ID_USR GROUP BY patients.ID_USR', function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    //Se ejecuta la query para mostrar un paciente por su id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT patients.ID_USR, SEX, AGE, HEIGHT, WEIGHT, PRESSURE, BREATHING, PULSE, TEMPERATURE, GROUP_CONCAT(medical_history.ILLNESS) AS ILLNESS FROM patients LEFT JOIN medical_history ON patients.ID_USR=medical_history.ID_USR WHERE patients.ID_USR = ? GROUP BY patients.ID_USR', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result[0]);
                }
                res.status(404).json({ message: 'Pacinte no encontado' });
            });
        });
    }
    //Se ejecuta la query para registrar un paciente
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var HISTORY;
            if (req.body.HISTORY) { //Si se enviaron padecimintos
                HISTORY = req.body.HISTORY; //Almacenamos el array de enfermedades en una variable
                delete req.body.HISTORY; //Se elimina el array de enefermedades para la primera consulta
            }
            //Se realiza la consulta de registro en la tabla patients 
            yield database_1.default.query('INSERT INTO patients set ?', [req.body]);
            if (HISTORY) { //Si se enviaron padecimintos
                //Consulta para insertar los padecimintos en la tabla de medical_history
                for (var i = 0; i < HISTORY.length; i++) {
                    yield database_1.default.query("INSERT INTO medical_history(ID_USR, ILLNESS) VALUES ('" + req.body.ID_USR + "', '" + HISTORY[i] + "')");
                }
            }
            res.json({ message: 'Pacinte registrado ' });
        });
    }
    //Se ejecuta la query para actualizar un paciente por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var HISTORYUP;
            if (req.body.HISTORY) { //Si se enviaron padecimintos
                HISTORYUP = req.body.HISTORY; //Almacenamos el array de enfermedades en una variable
                delete req.body.HISTORY; //Se elimina el array de enefermedades para la primera consulta
            }
            yield database_1.default.query('UPDATE patients set ? WHERE ID_USR = ?', [req.body, id], function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (result.affectedRows == 1) { //Se se realizó actualización
                        if (HISTORYUP) { //Si se enviaron padecimintos
                            //Se elimina los registros de la tabla medical_history para volver a insertarlos con la nueva información 
                            yield database_1.default.query('DELETE FROM medical_history WHERE ID_USR = ?', [id], function (err, result, fields) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    //Consulta para insertar los padecimintos en la tabla de medical_history
                                    for (var i = 0; i < HISTORYUP.length; i++) {
                                        yield database_1.default.query("INSERT INTO medical_history(ID_USR, ILLNESS) VALUES ('" + id + "', '" + HISTORYUP[i] + "')");
                                    }
                                });
                            });
                        }
                        res.json({ message: 'El paciente fue actualizado' });
                    }
                    else {
                        res.status(404).json({ message: 'Paciente no encontrado' });
                    }
                });
            });
        });
    }
    //Se ejecuta la query para eliminar un paciente por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM patients WHERE ID_USR = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.affectedRows == 1) {
                    res.json({ message: 'El paciente fue eliminado' });
                }
                else {
                    res.status(404).json({ message: 'Paciente no encontrado' });
                }
            });
        });
    }
}
exports.patientsController = new PatientsController();
