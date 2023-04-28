import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Orders} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'shipment'},
    foreignKeys: {
      shipmentIbfk_1Rel: {
        name: 'shipmentIbfk_1Rel',
        entity: 'Orders',
        entityKey: 'id',
        foreignKey: 'orderId'
      }
    }
  }
})
export class Shipment extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @belongsTo(() => Orders)
  orderId?: number;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'shipment_number', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  shipmentNumber?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'shipper_name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  shipperName?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'consignee_name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  consigneeName?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'shipment_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  shipmentDate?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'expected_delivery_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  expectedDeliveryDate?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'actual_delivery_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  actualDeliveryDate?: string;

  @property({
    type: 'string',
    length: 9,
    generated: 0,
    mysql: {columnName: 'shipment_status', dataType: 'enum', dataLength: 9, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  shipmentStatus?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Shipment>) {
    super(data);
  }
}

export interface ShipmentRelations {
  // describe navigational properties here
}

export type ShipmentWithRelations = Shipment & ShipmentRelations;
