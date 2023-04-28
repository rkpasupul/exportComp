import {Entity, model, property, hasMany} from '@loopback/repository';
import {Address} from './address.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'expcom', table: 'distributor'}}
})
export class Distributor extends Entity {
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
    length: 100,
    generated: 0,
    mysql: {columnName: 'first_name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    generated: 0,
    mysql: {columnName: 'last_name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  email: string;

  @property({
    type: 'string',
    length: 20,
    generated: 0,
    mysql: {columnName: 'phone', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  phone?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'created_at', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  createdAt?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'updated_at', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  updatedAt?: string;

  @hasMany(() => Address)
  address: Address[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Distributor>) {
    super(data);
  }
}

export interface DistributorRelations {
  // describe navigational properties here
}

export type DistributorWithRelations = Distributor & DistributorRelations;
