import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Userroles, UserrolesRelations, Roles} from '../models';
import {RolesRepository} from './roles.repository';

export class UserrolesRepository extends DefaultCrudRepository<
  Userroles,
  typeof Userroles.prototype.id,
  UserrolesRelations
> {

  public readonly roles: HasOneRepositoryFactory<Roles, typeof Userroles.prototype.id>;

  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Userroles, dataSource);
    this.roles = this.createHasOneRepositoryFactoryFor('roles', rolesRepositoryGetter);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
