const { Entity, Property } = require('@mikro-orm/core');
const { BaseEntity } = require('../shared/db/baseEntity.js');

@Entity()
class Ingrediente extends BaseEntity {
    @Property({ nullable: false, unique: true })
    nombre;

    @Property({ nullable: false })
    cantidad;

    @Property({ nullable: false })
    unidadMedida;
}

module.exports = { Ingrediente };