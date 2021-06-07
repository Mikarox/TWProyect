"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientsController_1 = require("../controllers/patientsController");
//Ruta para trabajar con la tabla patients y medical_ history de la base de datos
class PatientsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', patientsController_1.patientsController.list); //listar todos los pacientes
        this.router.get('/:id', patientsController_1.patientsController.getOne); //mostrar un paciente por su id
        this.router.post('/', patientsController_1.patientsController.register); //registrar un paciente
        this.router.put('/:id', patientsController_1.patientsController.update); //actualizar un paciente por su id
        this.router.delete('/:id', patientsController_1.patientsController.delete); //eliminar un paciente por su id
    }
}
const patientsRoutes = new PatientsRoutes;
exports.default = patientsRoutes.router;
