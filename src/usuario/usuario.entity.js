const { Entity, Property, Collection, OneToMany } = require("@mikro-orm/core");
const { Receta } = require('../receta/receta.entity.js');
const { BaseEntity } = require("../shared/db/baseEntity.js");

@Entity()
class Usuario extends BaseEntity {
    @Property({ nullable: false })
    nombre;

    @Property({ nullable: false })
    apellido;

    @Property({ nullable: false, unique: true })
    email;

    @Property({ nullable: false })
    password;

    @Property({ nullable: false })
    genero;

    @OneToMany(() => Receta, receta => receta.autor, { orphanRemoval: true }) // Añadimos opción de borrado en cascada
    recetas = new Collection(this);
}

module.exports = { Usuario };