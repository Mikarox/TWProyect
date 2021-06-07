"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const multerUser_1 = __importDefault(require("../libs/multerUser"));
//Ruta para trabajar con la tabla usrs de la base de datos
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usersController_1.usersController.list); //listar todos los usuarios
        this.router.get('/:id', usersController_1.usersController.getOne); //mostrar un usuario por su id
        this.router.post('/', multerUser_1.default.single('PHOTO'), usersController_1.usersController.register); //registrar un usuario
        this.router.post('/forgotpass', usersController_1.usersController.recoverPass);
        this.router.get('/verify/:email', usersController_1.usersController.validate); //valida el usuario en la base de datos
        this.router.put('/:id', multerUser_1.default.single('PHOTO'), usersController_1.usersController.update); //actualizar un usuario por su id
        this.router.delete('/:id', usersController_1.usersController.delete); //eliminar un usuario por su id
    }
}
const usersRoutes = new UsersRoutes;
exports.default = usersRoutes.router;
