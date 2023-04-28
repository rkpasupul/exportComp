import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'expcom', table: 'roles'}}})
export class Roles extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    generated: 0,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
