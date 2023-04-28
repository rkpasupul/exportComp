import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Inventory, InventoryRelations} from '../models';

export class InventoryRepository extends DefaultCrudRepository<
  Inventory,
  typeof Inventory.prototype.id,
  InventoryRelations
> {
  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource,
  ) {
    super(Inventory, dataSource);
  }
}
