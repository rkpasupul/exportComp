import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Users, UsersRelations, Userroles} from '../models';
import {UserrolesRepository} from './userroles.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly userroles: HasManyRepositoryFactory<Userroles, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource, @repository.getter('UserrolesRepository') protected userrolesRepositoryGetter: Getter<UserrolesRepository>,
  ) {
    super(Users, dataSource);
    this.userroles = this.createHasManyRepositoryFactoryFor('userroles', userrolesRepositoryGetter,);
    this.registerInclusionResolver('userroles', this.userroles.inclusionResolver);
  }
}
