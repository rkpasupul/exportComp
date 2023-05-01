import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Users, UsersRelations, Userroles, Roles} from '../models';
import {UserrolesRepository} from './userroles.repository';
import {RolesRepository} from './roles.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly userroles: HasManyRepositoryFactory<Userroles, typeof Users.prototype.id>;

  public readonly roles: HasManyThroughRepositoryFactory<Roles, typeof Roles.prototype.id,
          Userroles,
          typeof Users.prototype.id
        >;

  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource, @repository.getter('UserrolesRepository') protected userrolesRepositoryGetter: Getter<UserrolesRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Users, dataSource);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', rolesRepositoryGetter, userrolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.userroles = this.createHasManyRepositoryFactoryFor('userroles', userrolesRepositoryGetter,);
    this.registerInclusionResolver('userroles', this.userroles.inclusionResolver);
  }
}
