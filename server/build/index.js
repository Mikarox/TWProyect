"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
class Server {
    constructor() {
        this.app = express_1.default(); //Se ejecuta el servidor con la función express()
        this.config(); //Se ejecuta el método de configuraciones del servidor
        this.routes(); //Se ejecuta el método de rutas (peticiones)
    }
    //Métodos
    config() {
        this.app.set('port', process.env.PORT || 3000); //Se establece el puerto dende se aloja o el 3000
        this.app.use(morgan_1.default('dev')); //Muestra las peticiones por consola
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json()); //Permite leer archivos JSON
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads'))); //El navegador puede acceder a uploads
    }
    routes() {
        this.app.use(indexRoutes_1.default); //No se está usando
        this.app.use('/api/users', usersRoutes_1.default); //ruta para trabajar con la tabla usrs de la base de datos
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
//Se crea y ejecuta el servidor
const server = new Server();
server.start();
