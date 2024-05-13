const { Request, Response, NextFunction } = require("express");
const { Usuario } = require("./usuario.entity.js");
// const { orm } = require("../shared/db/orm.js");

// const em = orm.em;
// em.getRepository(Usuario);

async function sanitizeUsuarioInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        genero: req.body.genero,
        password:req.body.password
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}

async function findAll(req, res) {
    try {
        const usuarios = await em.find(Usuario);
        res.status(200).json({
            message: 'Usuarios encontrados',
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function findOne(req, res) {
    try {
        const id = req.params.id;
        const usuario = await em.findOneOrFail(Usuario, { id });
        res.status(200).json({
            message: 'Usuario encontrado',
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function add(req, res) {
    try {
        const newUser = em.create(Usuario, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Usuario creado',
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const user = await em.findOneOrFail(Usuario, { id });
        em.assign(user, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Usuario actualizado correctamente',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function remove(req, res) {
    try {
        const id = req.params.id;
        const userToDelete = await em.getReference(Usuario, id);
        em.removeAndFlush(userToDelete);
        res.status(200).json({
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function addReceta(req, res) {
    try {
        const idUsuario = req.params.id;
        const usuario = await em.findOneOrFail(Usuario, { id: idUsuario });
        // Aquí deberías manejar la lógica para agregar una nueva receta al usuario
        // Puedes acceder a los datos de la receta desde req.body, por ejemplo:
        // const nuevaReceta = { nombre: req.body.nombre, ingredientes: req.body.ingredientes, instrucciones: req.body.instrucciones };
        // usuario.recetas.push(nuevaReceta);
        // await em.flush();
        res.status(200).json({
            message: 'Receta agregada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { sanitizeUsuarioInput, findAll, findOne, add, update, remove, addReceta };