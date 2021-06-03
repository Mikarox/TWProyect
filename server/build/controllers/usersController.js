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
exports.usersController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mailer_1 = require("./../config/mailer");
const database_1 = __importDefault(require("../database"));
//Se definen lo que realizarán las peticiones 
class UserController {
    //Se ejecuta la query para listar todos los usuarios
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM users', function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    //Se ejecuta la query para mostrar un usuario por su id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM users WHERE ID_USR = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result[0]);
                }
                res.status(404).json({ message: 'Usuario no encontrado' });
            });
        });
    }
    //Se ejecuta la query para registrar un usuario
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.file) { //Si la foto existe 
                req.body.PHOTO = req.file.path; //Se agrega la dirección de la foto
            }
            let page = `<b>deveria enviar un botton para </b> <br> 
    <a href="http://localhost:4200/verify/` + req.body.EMAIL + `">verificar cuenta</a>
    `;
            yield mailer_1.transporter.sendMail({
                from: '"Verify Acount👻<' + req.body.NAME + " " + req.body.LASTNAME + ' Hospital@isc6to.com>"',
                to: req.body.EMAIL,
                subject: "Hello, did you create a acount? ✔",
                text: "Please verify account",
                html: page, // html body
            });
            req.body.USR_PASSW = yield bcryptjs_1.default.hash(req.body.USR_PASSW, 8); //Encriptando la contraseña
            yield database_1.default.query('INSERT INTO users set ?', [req.body]);
            res.json({ message: 'Usario registrado' });
        });
    }
    //Se ejecuta la query para actualizar un usuario por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE users set ? WHERE ID_USR = ?', [req.body, id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.affectedRows == 1) {
                    return res.json({ message: 'El usuario fue actualizado' });
                }
                res.status(404).json({ message: 'Usuario no encontrado' });
            });
        });
    }
    //Se ejecuta la query para eliminar un usuario por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM users WHERE ID_USR = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.affectedRows == 1) {
                    return res.json({ message: 'El usuario fue eliminado' });
                }
                res.status(404).json({ message: 'Usuario no encontrado' });
            });
        });
    }
}
exports.usersController = new UserController();
