import { Request, Response } from "express";
import { Receta } from "./receta.entity.js"; // Importa la entidad Receta
import { orm } from "../shared/db/orm.js";

const em = orm.em;
em.getRepository(Receta); // Asegúrate de que el repositorio esté configurado correctamente para la entidad Receta

// Middleware para sanitizar la entrada de la receta
function sanitizeRecetaInput(req: Request, res: Response, next: NextFunction) {
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
async function findAll(req: Request, res: Response) {
    try {
        const recetas = await em.find(Receta);
        return res.status(200).json({
            message: "Recetas encontradas",
            data: recetas
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para encontrar una receta por su ID
async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const receta = await em.findOneOrFail(Receta, { id });
        return res.status(200).json({
            message: `Receta con ID ${id} encontrada`,
            data: receta
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para agregar una nueva receta
async function add(req: Request, res: Response) {
    try {
        const newReceta = em.create(Receta, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Receta creada',
            data: newReceta
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para actualizar una receta existente
async function update(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const receta = await em.findOneOrFail(Receta, { id });
        em.assign(receta, req.body.sanitizedInput);
        await em.flush();
        return res.status(200).json({
            message: `Receta actualizada correctamente`,
            data: receta
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para eliminar una receta existente
async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const recetaToDelete = await em.getReference(Receta, id);
        await em.removeAndFlush(recetaToDelete);
        return res.status(200).json({
            message: `Receta eliminada correctamente`
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export { findAll, findOne, add, sanitizeRecetaInput, update, remove };