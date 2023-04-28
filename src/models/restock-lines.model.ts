import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Product, RestockOrder} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'restock_lines'},
    foreignKeys: {
      restockLinesIbfk_1Rel: {
        name: 'restockLinesIbfk_1Rel',
        entity: 'RestockOrder',
        entityKey: 'id',
        foreignKey: 'restockOrderId'
      },
      restockLinesIbfk_2Rel: {
        name: 'restockLinesIbfk_2Rel',
        entity: 'Product',
        entityKey: 'id',
        foreignKey: 'productId'
      }
    }
  }
})
export class RestockLines extends Entity {
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
    type: 'number',
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'linenum', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'Y', generated: 0},
  })
  linenum?: number;

  @belongsTo(() => Product)
  productId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'quantity', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  quantity?: number;

  @belongsTo(() => RestockOrder)
  restockOrderId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RestockLines>) {
    super(data);
  }
}

export interface RestockLinesRelations {
  // describe navigational properties here
}

export type RestockLinesWithRelations = RestockLines & RestockLinesRelations;
