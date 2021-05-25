"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
class UserController {
    list(req, res) {
        res.json({ text: 'Listando usuario' });
    }
    getOne(req, res) {
        res.json({ text: 'Mostrando usuario ' + req.params.id });
    }
    register(req, res) {
        res.json({ text: 'Registrando usario' });
    }
    update(req, res) {
        res.json({ text: 'Actualizando usario ' + req.params.id });
    }
    delete(req, res) {
        res.json({ text: 'Eliminando usuario ' + req.params.id });
    }
}
exports.usersController = new UserController();
