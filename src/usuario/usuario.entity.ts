import {Entity, Property, Collection, OneToMany} from "@mikro-orm/core";
import { Receta } from '../receta/receta.entity.js';
import { BaseEntity } from "../shared/db/baseEntity.js";

@Entity()
export class Usuario extends BaseEntity {

    @Property({nullable:false})
    nombre!: string;

    @Property({nullable:false})
    apellido!: string;

    @Property({nullable:false, unique:true})
    email!: string;

    @Property({nullable:false})
    password!: string;

    
    @Property({nullable:false})
    genero!: string; 

    @OneToMany(() => Receta, receta => receta.autor, { orphanRemoval: true }) // Añadimos opción de borrado en cascada
    recetas = new Collection<Receta>(this);
}