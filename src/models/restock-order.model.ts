import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Warehouse} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'restock_order'},
    foreignKeys: {
      restockOrderIbfk_1Rel: {
        name: 'restockOrderIbfk_1Rel',
        entity: 'Warehouse',
        entityKey: 'id',
        foreignKey: 'warehouseId'
      }
    }
  }
})
export class RestockOrder extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @belongsTo(() => Warehouse)
  warehouseId?: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'order_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  orderDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RestockOrder>) {
    super(data);
  }
}

export interface RestockOrderRelations {
  // describe navigational properties here
}

export type RestockOrderWithRelations = RestockOrder & RestockOrderRelations;
