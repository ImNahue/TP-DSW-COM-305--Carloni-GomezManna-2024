const { Router } = require("express");
const { add, findAll, findOne, remove, sanitizeIngredienteInput, update } = require("./ingrediente.controller.js");

const ingredienteRouter = Router();

ingredienteRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizeIngredienteInput, add)
    .put('/:id', sanitizeIngredienteInput, update)
    .patch('/:id', sanitizeIngredienteInput, update)
    .delete('/:id', remove);

module.exports = { ingredienteRouter };