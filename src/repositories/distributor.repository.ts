import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Distributor, DistributorRelations, Address} from '../models';
import {AddressRepository} from './address.repository';

export class DistributorRepository extends DefaultCrudRepository<
  Distributor,
  typeof Distributor.prototype.id,
  DistributorRelations
> {

  public readonly address: HasManyRepositoryFactory<Address, typeof Distributor.prototype.id>;

  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Distributor, dataSource);
    this.address = this.createHasManyRepositoryFactoryFor('address', addressRepositoryGetter,);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}
