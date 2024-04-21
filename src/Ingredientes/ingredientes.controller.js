const { Request, Response } = require("express");
const { Ingrediente } = require("./ingrediente.entity.js"); // Importa la entidad Ingrediente
const { orm } = require("../shared/db/orm.js");

const em = orm.em;
em.getRepository(Ingrediente); // Asegúrate de que el repositorio esté configurado correctamente para la entidad Ingrediente

// Middleware para sanitizar la entrada del ingrediente
function sanitizeIngredienteInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        cantidad: req.body.cantidad,
        unidadMedida: req.body.unidadMedida,
        // Agrega cualquier otro campo que desees para un ingrediente
    };

    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}

// Función para encontrar todos los ingredientes
async function findAll(req, res) {
    try {
        const ingredientes = await em.find(Ingrediente);
        return res.status(200).json({
            message: "Ingredientes encontrados",
            data: ingredientes
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para encontrar un ingrediente por su ID
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const ingrediente = await em.findOneOrFail(Ingrediente, { id });
        return res.status(200).json({
            message: `Ingrediente con ID ${id} encontrado`,
            data: ingrediente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para agregar un nuevo ingrediente
async function add(req, res) {
    try {
        const newIngrediente = em.create(Ingrediente, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Ingrediente creado',
            data: newIngrediente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para actualizar un ingrediente existente
async function update(req, res) {
    try {
        const id = req.params.id;
        const ingrediente = await em.findOneOrFail(Ingrediente, { id });
        em.assign(ingrediente, req.body.sanitizedInput);
        await em.flush();
        return res.status(200).json({
            message: `Ingrediente actualizado correctamente`,
            data: ingrediente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para eliminar un ingrediente existente
async function remove(req, res) {
    try {
        const id = req.params.id;
        const ingredienteToDelete = await em.getReference(Ingrediente, id);
        await em.removeAndFlush(ingredienteToDelete);
        return res.status(200).json({
            message: `Ingrediente eliminado correctamente`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { findAll, findOne, add, sanitizeIngredienteInput, update, remove };