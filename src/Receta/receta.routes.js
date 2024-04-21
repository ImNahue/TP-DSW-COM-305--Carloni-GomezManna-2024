const { Router } = require("express");
const { validarToken } = require("../shared/middleware/auth.middleware.js");
const { findAll, findOne, add, sanitizeRecetaInput, update, remove } = require("./usuario.controller.js");

const usuarioRouter = Router();

usuarioRouter
    .get('/', validarToken, findAll)
    .get('/:id', findOne)
    .post('/', sanitizeRecetaInput, add)
    .put('/:id', sanitizeRecetaInput, update)
    .delete('/:id', remove);

module.exports = { usuarioRouter };