import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Shipment, ShipmentRelations} from '../models';

export class ShipmentRepository extends DefaultCrudRepository<
  Shipment,
  typeof Shipment.prototype.id,
  ShipmentRelations
> {
  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource,
  ) {
    super(Shipment, dataSource);
  }
}
