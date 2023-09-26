import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { UsuariosController } from './controllers/UsuariosController';

let server: Express = express();

server.use(cors());
server.use(express.json());

let usuariosController = new UsuariosController();

server.get('/usuarios', usuariosController.list);

server.get('/usarios', usuariosController.find);

server.post ('/usuarios', usuariosController.create);

server.put('/usuarios/:id', usuariosController.update);

server.delete('/usuarios/:id', usuariosController.delete);

export default {
    start () {
        server.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    }
};
