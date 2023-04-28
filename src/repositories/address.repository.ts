import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Address, AddressRelations} from '../models';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {
  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource,
  ) {
    super(Address, dataSource);
  }
}
