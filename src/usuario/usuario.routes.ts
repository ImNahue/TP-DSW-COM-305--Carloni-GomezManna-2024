import { Router } from "express";
import { obtenerTodosLosUsuarios, obtenerUsuario, agregarUsuario, modificarUsuario, eliminarUsuario } from "./usuario.controller.js";
import { validarToken } from "../shared/middleware/auth.middleware.js";

const usuarioRouter = Router();

usuarioRouter
    .get('/', validarToken, obtenerTodosLosUsuarios)
    .get('/:id', obtenerUsuario)
    .post('/', agregarUsuario)
    .put('/:id', modificarUsuario)
    .delete('/:id', eliminarUsuario);

export { usuarioRouter };