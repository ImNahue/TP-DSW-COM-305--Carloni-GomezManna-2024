import { Router } from "express";
import { sanitizeUsuarioInput, findAll, findOne, add, update, remove, addReceta } from "./usuario.controller.js";
import { validarToken } from "../shared/middleware/auth.middleware.js";

const usuarioRouter = Router();

usuarioRouter
    .get('/', validarToken, findAll)
    .get('/:id', findOne)
    .post('/', sanitizeUsuarioInput, add)
    .put('/:id', sanitizeUsuarioInput, update)
    .delete('/:id', sanitizeUsuarioInput, remove)
    .post('/add-receta', sanitizeUsuarioInput, addReceta);

export { usuarioRouter };