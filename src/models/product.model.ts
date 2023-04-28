import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'expcom', table: 'product'}}})
export class Product extends Entity {
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
    length: 100,
    generated: 0,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  name?: string;

  @property({
    type: 'string',
    length: 65535,
    generated: 0,
    mysql: {columnName: 'description', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  description?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 2,
    generated: 0,
    mysql: {columnName: 'price', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 2, nullable: 'Y', generated: 0},
  })
  price?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
