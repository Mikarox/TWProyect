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
exports.diseasesController = void 0;
const database_1 = __importDefault(require("../database"));
const fs_1 = __importDefault(require("fs"));
//Se definen lo que realizarán las peticiones 
class DiseasesController {
    //Se ejecuta la query para listar todas las enfermedades
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM diseases', function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    //Se ejecuta la query para mostrar una enfermedad por su id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM diseases WHERE ID_DISEASE = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result[0]);
                }
                res.status(404).json({ message: 'Enfermedad no encontrada' });
            });
        });
    }
    //Se ejecuta la query para registrar una enfermedad
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.file) { //Si la imagen existe 
                req.body.IMAGE = req.file.path; //Se agrega la dirección de la imagen
            }
            yield database_1.default.query('INSERT INTO diseases set ?', [req.body]);
            res.json({ message: 'Enfermedad registrada' });
        });
    }
    //Se ejecuta la query para actualizar una enfermedad por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //Se obtiene primero la ruta de la imagen actual para eliminarla
            yield database_1.default.query('SELECT IMAGE FROM diseases WHERE ID_DISEASE = ?', [id], function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (result[0]) { //Si existe la enfermedad
                        if (result[0].IMAGE) { //Si existe la imagen
                            const pathImage = result[0].IMAGE; //Se alamacena la ruta de la imagen
                            fs_1.default.unlinkSync(pathImage); //Se elimina la imagen
                        }
                        if (req.file) { //Si la imagen existe 
                            req.body.IMAGE = req.file.path; //Se agrega la dirección de la imagen
                        }
                        else {
                            req.body.IMAGE = '';
                        }
                        //Se ejecuta la query para actualizar la enfermedad
                        yield database_1.default.query('UPDATE diseases set ? WHERE ID_DISEASE = ?', [req.body, id], function (err, result, fields) {
                            if (err)
                                throw err;
                            if (result.affectedRows == 1) {
                                res.json({ message: 'La enfermedad fue actualizada' });
                            }
                            else {
                                res.status(404).json({ message: 'Enfermedad no encontrada' });
                            }
                        });
                    }
                    else {
                        res.status(404).json({ message: 'Enfermedead no encontrada' });
                    }
                });
            });
        });
    }
    //Se ejecuta la query para eliminar una enfermedad por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //Se obtiene primero la ruta de la imagen para eliminarla
            yield database_1.default.query('SELECT IMAGE FROM diseases WHERE ID_DISEASE = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result[0]) { //Si existe la enefermedad 
                    if (result[0].IMAGE) { //Si existe la imagen
                        const pathImage = result[0].IMAGE; //Se alamacena la ruta de la imagen
                        fs_1.default.unlinkSync(pathImage); //Se elimina la imagen
                    }
                }
            });
            // Consulta para eleiminar a la enfermedad
            yield database_1.default.query('DELETE FROM diseases WHERE ID_DISEASE = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.affectedRows == 1) {
                    res.json({ message: 'La enfermedad fue eliminada' });
                }
                else {
                    res.status(404).json({ message: 'Enfermedad no encontrada' });
                }
            });
        });
    }
}
exports.diseasesController = new DiseasesController();
