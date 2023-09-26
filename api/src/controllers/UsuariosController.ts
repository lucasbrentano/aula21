import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";

export class UsuariosController {
    async list (req: Request, res: Response): Promise<Response> {
        let users: Usuario[] = await Usuario.find();

        return res.status(200).json(users);
    }

    async find (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let id = Number(req.params.id);
    
        let usuario: Usuario|null = await Usuario.findOneBy({ id });
        if (!usuario) {
            return res.status(422).json({ error: 'Usuário não encontrado!' })
        }
        
        return res.status(200).json(usuario);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
    
        let usuario: Usuario = await Usuario.create({
            nome: body.nome,
            email: body.email,
            senha: body.senha,
        }).save();
    
        return res.status(200).json(usuario);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let id = Number(req.params.id);
    
        let usuario: Usuario|null = await Usuario.findOneBy({ id });
        if (!usuario) {
            return res.status(422).json({ error: 'Usuário não encontrado!' })
        } 
        usuario.nome = body.nome;
        usuario.email = body.email;
        usuario.senha = body.senha;
        await usuario.save();
    
        return res.status(200).json(usuario);
    }

    async delete (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let id = Number(req.params.id);
    
        let usuario: Usuario|null = await Usuario.findOneBy({ id });
        if (!usuario) {
            return res.status(422).json({ error: 'Usuário não encontrado!' })
        }
        
        usuario.remove();
    
        return res.status(200).json();
    }
}