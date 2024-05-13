const { Router } = require("express");
const { sanitizeUsuarioInput, findAll, findOne, add, update, remove, addReceta } = require("./usuario.controller");
// const { validarToken } = require("../shared/middleware/auth.middleware.js");

const usuarioRouter = Router();

usuarioRouter
    .get('/', validarToken, findAll)
    .get('/:id', findOne)
    .post('/', sanitizeUsuarioInput, add)
    .put('/:id', sanitizeUsuarioInput, update)
    .delete('/:id', sanitizeUsuarioInput, remove)
    .post('/add-receta', sanitizeUsuarioInput, addReceta);

module.exports = { usuarioRouter };
//Sacado de Youtube