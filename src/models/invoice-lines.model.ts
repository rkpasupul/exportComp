import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Invoice} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'invoice_lines'},
    foreignKeys: {
      invoiceLinesIbfk_1Rel: {
        name: 'invoiceLinesIbfk_1Rel',
        entity: 'Invoice',
        entityKey: 'id',
        foreignKey: 'invoiceId'
      }
    }
  }
})
export class InvoiceLines extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @belongsTo(() => Invoice)
  invoiceId?: number;

  @property({
    type: 'number',
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'linenum', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'Y', generated: 0},
  })
  linenum?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 2,
    generated: 0,
    mysql: {columnName: 'price', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 2, nullable: 'Y', generated: 0},
  })
  price?: number;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'product_name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  productName?: string;

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

  constructor(data?: Partial<InvoiceLines>) {
    super(data);
  }
}

export interface InvoiceLinesRelations {
  // describe navigational properties here
}

export type InvoiceLinesWithRelations = InvoiceLines & InvoiceLinesRelations;
