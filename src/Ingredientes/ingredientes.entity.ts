import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';

@Entity()
export class Ingrediente extends BaseEntity {
    
    @Property({ nullable: false, unique: true })
    nombre!: string;

    @Property({ nullable: false })
    cantidad!: number;

    @Property({ nullable: false })
    unidadMedida!: string;

   

}