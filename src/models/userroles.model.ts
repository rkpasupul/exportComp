import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import {Roles, Users} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'userroles'},
    foreignKeys: {
      userrolesIbfk_1Rel: {
        name: 'userrolesIbfk_1Rel',
        entity: 'Users',
        entityKey: 'id',
        foreignKey: 'userId'
      },
      userrolesIbfk_2Rel: {
        name: 'userrolesIbfk_2Rel',
        entity: 'Roles',
        entityKey: 'id',
        foreignKey: 'roleId'
      }
    }
  }
})
export class Userroles extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @belongsTo(() => Roles)
  roleId: number;

  @belongsTo(() => Users)
  userId: number;

  @hasOne(() => Roles, {keyTo: 'id'})
  roles: Roles;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Userroles>) {
    super(data);
  }
}

export interface UserrolesRelations {
  // describe navigational properties here
}

export type UserrolesWithRelations = Userroles & UserrolesRelations;
