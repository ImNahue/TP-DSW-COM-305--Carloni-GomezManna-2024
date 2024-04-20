import { Router } from "express";
import { add, findAll, findOne, remove, sanitizeIngredienteInput, update } from "./ingrediente.controller.js";

const ingredienteRouter = Router();

ingredienteRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizeIngredienteInput, add)
    .put('/:id', sanitizeIngredienteInput, update)
    .patch('/:id', sanitizeIngredienteInput, update)
    .delete('/:id', remove);

export { ingredienteRouter };