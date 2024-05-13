const { Request, Response } = require("express");
const { Receta } = require("./receta.entity.js"); // Importa la entidad Receta
// const { orm } = require("../shared/db/orm.js");

// const em = orm.em;
// em.getRepository(Receta); // Asegúrate de que el repositorio esté configurado correctamente para la entidad Receta

// Middleware para sanitizar la entrada de la receta
function sanitizeRecetaInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        ingredientes: req.body.ingredientes,
        instrucciones: req.body.instrucciones,
        tiempoPreparacion: req.body.tiempoPreparacion,
        dificultad: req.body.dificultad,
        categoria: req.body.categoria 
    };

    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}

// Función para encontrar todas las recetas
async function findAll(req, res) {
    try {
        const recetas = await em.find(Receta);
        return res.status(200).json({
            message: "Recetas encontradas",
            data: recetas
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para encontrar una receta por su ID
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const receta = await em.findOneOrFail(Receta, { id });
        return res.status(200).json({
            message: `Receta con ID ${id} encontrada`,
            data: receta
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para agregar una nueva receta
async function add(req, res) {
    try {
        const newReceta = em.create(Receta, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Receta creada',
            data: newReceta
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para actualizar una receta existente
async function update(req, res) {
    try {
        const id = req.params.id;
        const receta = await em.findOneOrFail(Receta, { id });
        em.assign(receta, req.body.sanitizedInput);
        await em.flush();
        return res.status(200).json({
            message: `Receta actualizada correctamente`,
            data: receta
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para eliminar una receta existente
async function remove(req, res) {
    try {
        const id = req.params.id;
        const recetaToDelete = await em.getReference(Receta, id);
        await em.removeAndFlush(recetaToDelete);
        return res.status(200).json({
            message: `Receta eliminada correctamente`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { findAll, findOne, add, sanitizeRecetaInput, update, remove };