import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Product, Warehouse} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'expcom', table: 'inventory'},
    foreignKeys: {
      inventoryIbfk_1Rel: {
        name: 'inventoryIbfk_1Rel',
        entity: 'Product',
        entityKey: 'id',
        foreignKey: 'productId'
      },
      inventoryIbfk_2Rel: {
        name: 'inventoryIbfk_2Rel',
        entity: 'Warehouse',
        entityKey: 'id',
        foreignKey: 'warehouseId'
      }
    }
  }
})
export class Inventory extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @belongsTo(() => Product)
  productId?: number;

  @belongsTo(() => Warehouse)
  warehouseId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'quantity', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  quantity?: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'updated_at', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  updatedAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Inventory>) {
    super(data);
  }
}

export interface InventoryRelations {
  // describe navigational properties here
}

export type InventoryWithRelations = Inventory & InventoryRelations;
