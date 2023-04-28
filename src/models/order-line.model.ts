import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Orders} from './orders.model';
import {Product} from './product.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'order_line'},
    foreignKeys: {
      orderLineIbfk_1Rel: {
        name: 'orderLineIbfk_1Rel',
        entity: 'Orders',
        entityKey: 'id',
        foreignKey: 'orderId'
      },
      orderLineIbfk_2Rel: {
        name: 'orderLineIbfk_2Rel',
        entity: 'Product',
        entityKey: 'id',
        foreignKey: 'productId'
      }
    }
  }
})
export class OrderLine extends Entity {
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

  @belongsTo(() => Orders)
  orderId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 2,
    generated: 0,
    mysql: {columnName: 'price', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 2, nullable: 'Y', generated: 0},
  })
  price?: number;


  //@belongsTo(() => Product)
  //productId?: number;
  @belongsTo(() => Product)
  productId: number;
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'quantity', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  quantity?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<OrderLine>) {
    super(data);
  }
}

export interface OrderLineRelations {
  // describe navigational properties here
}

export type OrderLineWithRelations = OrderLine & OrderLineRelations;
