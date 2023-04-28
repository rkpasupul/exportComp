import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Invoice, InvoiceRelations} from '../models';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {
  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource,
  ) {
    super(Invoice, dataSource);
  }
}
