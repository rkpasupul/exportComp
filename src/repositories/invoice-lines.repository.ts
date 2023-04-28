import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {InvoiceLines, InvoiceLinesRelations} from '../models';

export class InvoiceLinesRepository extends DefaultCrudRepository<
  InvoiceLines,
  typeof InvoiceLines.prototype.id,
  InvoiceLinesRelations
> {
  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource,
  ) {
    super(InvoiceLines, dataSource);
  }
}
