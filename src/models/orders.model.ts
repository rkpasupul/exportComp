import {Entity, belongsTo, model, property, hasMany} from '@loopback/repository';
import {Distributor} from './distributor.model';
import {OrderLine} from './order-line.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'orders'},
    foreignKeys: {
      ordersIbfk_1Rel: {
        name: 'ordersIbfk_1Rel',
        entity: 'Distributor',
        entityKey: 'id',
        foreignKey: 'distributorId'
      }
    }
  }
})
export class Orders extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  // @belongsTo(() => Distributor)
  //distributorId?: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'order_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  orderDate?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 2,
    generated: 0,
    mysql: {columnName: 'total_amount', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 2, nullable: 'Y', generated: 0},
  })
  totalAmount?: number;

  @hasMany(() => OrderLine, {keyTo: 'orderId'})
  orderLines: OrderLine[];
  @belongsTo(() => Distributor)
  distributorId: number;
  @property({
    type: 'string',
    length: 9,
    generated: 0,
    mysql: {columnName: 'order_status', dataType: 'enum', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  orderStatus?: string;

  /*   @hasMany(() => OrderLine)
    orderLines: OrderLine[]; */
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations {
  // describe navigational properties here
}

export type OrdersWithRelations = Orders & OrdersRelations;
