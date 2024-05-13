const { Entity, Property } = require("@mikro-orm/core");
const { BaseEntity } = require("../shared/db/baseEntity.js");

@Entity()
class Receta extends BaseEntity {
    @Property({ nullable: false })
    titulo;

    @Property({ nullable: false })
    ingredientes;

    @Property({ nullable: false })
    instrucciones;

    @Property({ nullable: false })
    tiempoPreparacion;

    @Property({ nullable: false })
    dificultad;

    @Property({ nullable: false })
    categoria;
}

module.exports = { Receta }; 




