import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";

@Entity()
export class Receta extends BaseEntity {

    @Property({ nullable: false })
    titulo!: string;

    @Property({ nullable: false })
    ingredientes!: string[];

    @Property({ nullable: false })
    instrucciones!: string;

    @Property({ nullable: false })
    tiempoPreparacion!: string;

    @Property({ nullable: false })
    dificultad!: string;

    @Property({ nullable: false })
    categoria!: string;
}