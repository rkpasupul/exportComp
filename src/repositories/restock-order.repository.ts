import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {RestockOrder, RestockOrderRelations} from '../models';

export class RestockOrderRepository extends DefaultCrudRepository<
  RestockOrder,
  typeof RestockOrder.prototype.id,
  RestockOrderRelations
> {
  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource,
  ) {
    super(RestockOrder, dataSource);
  }
}
