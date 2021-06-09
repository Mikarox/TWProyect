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
const fs_1 = __importDefault(require("fs"));
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
                res.status(404).json({ message: 'Usuario no encontrado en getone' });
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
            if (req.body.IS_REG == "0") {
                yield mailer_1.transporter.sendMail({
                    from: '"Verify Acount👻<' + req.body.NAME + " " + req.body.LASTNAME + ' Hospital@isc6to.com>"',
                    to: req.body.EMAIL,
                    subject: "Hello, did you create a acount? ✔",
                    text: "Please verify account",
                    html: page, // html body
                });
            }
            req.body.USR_PASSW = yield bcryptjs_1.default.hash(req.body.USR_PASSW, 8); //Encriptando la contraseña
            yield database_1.default.query('INSERT INTO users set ?', [req.body]);
            res.json({ message: 'Usario registrado' });
        });
    }
    //Se ejecuta la query para actualizar un usuario por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //Se obtiene primero la ruta de la foto actual para eliminarla
            yield database_1.default.query('SELECT PHOTO FROM users WHERE ID_USR = ?', [id], function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (result[0]) { //Si existe el usairo
                        if (result[0].PHOTO) { //Si existe la foto
                            const pathPhoto = result[0].PHOTO; //Se alamacena la ruta de la foto
                            fs_1.default.unlinkSync(pathPhoto); //Se elimina la foto 
                        }
                        if (req.file) { //Si la foto existe 
                            req.body.PHOTO = req.file.path; //Se agrega la dirección de la foto
                        }
                        else {
                            req.body.PHOTO = '';
                        }
                        //Se ejecuta la query para actualizar al usario
                        yield database_1.default.query('UPDATE users set ? WHERE ID_USR = ?', [req.body, id], function (err, result, fields) {
                            if (err)
                                throw err;
                            if (result.affectedRows == 1) {
                                res.json({ message: 'El usuario fue actualizado' });
                            }
                            else {
                                res.status(404).json({ message: 'Usuario no encontrado' });
                            }
                        });
                    }
                    else {
                        res.status(404).json({ message: 'Usuario no encontrado' });
                    }
                });
            });
        });
    }
    //Se ejecuta la query para eliminar un usuario por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //Se obtiene primero la ruta de la foto para eliminarla
            yield database_1.default.query('SELECT PHOTO FROM users WHERE ID_USR = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result[0]) { //Si existe el usairo
                    if (result[0].PHOTO) { //Si existe la foto
                        const pathPhoto = result[0].PHOTO; //Se alamacena la ruta de la foto
                        fs_1.default.unlinkSync(pathPhoto); //Se elimina la foto 
                    }
                }
            });
            //Consulta para eleiminar al usuairo 
            yield database_1.default.query('DELETE FROM users WHERE ID_USR = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.affectedRows == 1) {
                    res.json({ message: 'El usuario fue eliminado' });
                }
                else {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                }
                res.status(404).json({ message: 'Usuario no encontrado en delete' });
            });
        });
    }
    //Se ejecuta la query para validar un usuario por su email
    validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            yield database_1.default.query('UPDATE users set IS_REG="1" WHERE EMAIL = ?', [email], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.affectedRows == 1) {
                    return res.json({ message: 'El usuario fue validado correctamente' });
                }
                res.status(404).json({ message: 'Correo INVALIDO, NO VALIDADO' });
            });
        });
    }
    //Se ejecuta la query para restablecer la contrasna de  un usuario por su email
    recoverPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('USR_NAME: ' + req.body.USR_NAME);
            console.log('EMAIL: ' + req.body.EMAIL);
            //validate 
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM users WHERE USR_NAME = ? ', [req.body.USR_NAME], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 1) {
                    if (bcryptjs_1.default.compareSync(req.body.USR_PASSW, result[0].USR_PASSW)) {
                        return res.json(result[0]);
                    }
                    else {
                        res.status(404).json({ message: 'Credenciales incorrectas' });
                    }
                }
                else {
                    res.status(404).json({ message: 'existen varios ==' });
                }
                res.status(404).json({ message: 'Credenciales incorrectas' });
            });
        });
    }
    existUsrName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params) {
                const { usrName } = req.params;
                yield database_1.default.query('SELECT * FROM users WHERE USR_NAME = ?', [usrName], function (err, result, fields) {
                    if (err)
                        throw err;
                    if (result.length > 0) {
                        return res.json({ message: 'Existe' });
                    }
                    return res.json({ message: 'No existe' });
                });
            }
            else {
                return res.json({ message: 'No existe' });
            }
        });
    }
    existUsrEmial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params) {
                const { usrEmail } = req.params;
                yield database_1.default.query('SELECT * FROM users WHERE EMAIL = ?', [usrEmail], function (err, result, fields) {
                    if (err)
                        throw err;
                    if (result.length > 0) {
                        return res.json({ message: 'Existe' });
                    }
                    return res.json({ message: 'No existe' });
                });
            }
            else {
                return res.json({ message: 'No existe' });
            }
        });
    }
}
exports.usersController = new UserController();
