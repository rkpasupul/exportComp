import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Orders} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'invoice'},
    foreignKeys: {
      invoiceIbfk_1Rel: {
        name: 'invoiceIbfk_1Rel',
        entity: 'Orders',
        entityKey: 'id',
        foreignKey: 'orderId'
      }
    }
  }
})
export class Invoice extends Entity {
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
    mysql: {columnName: 'invoice_number', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  invoiceNumber?: string;

  @belongsTo(() => Orders)
  orderId?: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'invoice_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  invoiceDate?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 2,
    generated: 0,
    mysql: {columnName: 'total_amount', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 2, nullable: 'Y', generated: 0},
  })
  totalAmount?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
