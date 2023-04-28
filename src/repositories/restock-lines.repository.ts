import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {RestockLines, RestockLinesRelations} from '../models';

export class RestockLinesRepository extends DefaultCrudRepository<
  RestockLines,
  typeof RestockLines.prototype.id,
  RestockLinesRelations
> {
  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource,
  ) {
    super(RestockLines, dataSource);
  }
}
