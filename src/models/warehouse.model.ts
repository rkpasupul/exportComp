import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'expcom', table: 'warehouse'}}})
export class Warehouse extends Entity {
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
    length: 255,
    generated: 0,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: {columnName: 'address_line_1', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  addressLine_1: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'address_line_2', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  addressLine_2?: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    generated: 0,
    mysql: {columnName: 'city', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  city: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    generated: 0,
    mysql: {columnName: 'state', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  state: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    generated: 0,
    mysql: {columnName: 'country', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  country: string;

  @property({
    type: 'string',
    required: true,
    length: 20,
    generated: 0,
    mysql: {columnName: 'postal_code', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  postalCode: string;

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

  @property({
    type: 'string',
    length: 20,
    generated: 0,
    mysql: {columnName: 'contact_number', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  contactNumber?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Warehouse>) {
    super(data);
  }
}

export interface WarehouseRelations {
  // describe navigational properties here
}

export type WarehouseWithRelations = Warehouse & WarehouseRelations;
