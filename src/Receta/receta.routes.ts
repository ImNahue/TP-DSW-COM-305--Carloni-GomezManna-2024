import { Router } from "express";
import { validarToken } from "../shared/middleware/auth.middleware.js";
import { findAll, findOne, add, sanitizeRecetaInput, update, remove } from "./usuario.controller.js";

const usuarioRouter = Router();

usuarioRouter
    .get('/', validarToken, findAll)
    .get('/:id', findOne)
    .post('/', sanitizeRecetaInput, add)
    .put('/:id', sanitizeRecetaInput, update)
    .delete('/:id', remove);

export { usuarioRouter };