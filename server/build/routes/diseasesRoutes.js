"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diseasesController_1 = require("../controllers/diseasesController");
const multerDiseases_1 = __importDefault(require("../libs/multerDiseases"));
//Ruta para trabajar con la tabla diseases de la base de datos
class DiseasesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', diseasesController_1.diseasesController.list); //listar todos las enfermedades
        this.router.get('/:id', diseasesController_1.diseasesController.getOne); //mostrar una enfermedad por su id
        this.router.post('/', multerDiseases_1.default.single('IMAGE'), diseasesController_1.diseasesController.register); //registrar una enfermedad
        this.router.put('/:id', multerDiseases_1.default.single('IMAGE'), diseasesController_1.diseasesController.update); //actualizar una enfermedad por su id
        this.router.delete('/:id', diseasesController_1.diseasesController.delete); //eliminar una enfermedad por su id
    }
}
const diseasesRoutes = new DiseasesRoutes;
exports.default = diseasesRoutes.router;
