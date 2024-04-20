import { Request, Response } from "express";
import { Ingrediente } from "./ingrediente.entity.js"; // Importa la entidad Ingrediente
import { orm } from "../shared/db/orm.js";

const em = orm.em;
em.getRepository(Ingrediente); // Asegurarse de que el repositorio esté configurado correctamente para la entidad Ingrediente

// Middleware para sanitizar la entrada del ingrediente
function sanitizeIngredienteInput(req: Request, res: Response, next: NextFunction) {
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
async function findAll(req: Request, res: Response) {
    try {
        const ingredientes = await em.find(Ingrediente);
        return res.status(200).json({
            message: "Ingredientes encontrados",
            data: ingredientes
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para encontrar un ingrediente por su ID
async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const ingrediente = await em.findOneOrFail(Ingrediente, { id });
        return res.status(200).json({
            message: `Ingrediente con ID ${id} encontrado`,
            data: ingrediente
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para agregar un nuevo ingrediente
async function add(req: Request, res: Response) {
    try {
        const newIngrediente = em.create(Ingrediente, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Ingrediente creado',
            data: newIngrediente
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para actualizar un ingrediente existente
async function update(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const ingrediente = await em.findOneOrFail(Ingrediente, { id });
        em.assign(ingrediente, req.body.sanitizedInput);
        await em.flush();
        return res.status(200).json({
            message: `Ingrediente actualizado correctamente`,
            data: ingrediente
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Función para eliminar un ingrediente existente
async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const ingredienteToDelete = await em.getReference(Ingrediente, id);
        await em.removeAndFlush(ingredienteToDelete);
        return res.status(200).json({
            message: `Ingrediente eliminado correctamente`
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export { findAll, findOne, add, sanitizeIngredienteInput, update, remove };
