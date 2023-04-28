import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Distributor, Orders, OrdersRelations, OrderLine} from '../models';
//import {OrderLineRepository} from './order-line.repository';
import {DistributorRepository} from './distributor.repository';
import {OrderLineRepository} from './order-line.repository';

export class OrdersRepository extends DefaultCrudRepository<
  Orders,
  typeof Orders.prototype.id,
  OrdersRelations
> {


  //public readonly orderLines: HasManyRepositoryFactory<OrderLine, typeof Orders.prototype.id>;
  public readonly orderLines: HasManyRepositoryFactory<OrderLine, typeof Orders.prototype.id>;
  public readonly distributor: BelongsToAccessor<Distributor, typeof Orders.prototype.id>;

  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource, @repository.getter('DistributorRepository') protected distributorRepositoryGetter: Getter<DistributorRepository>, @repository.getter('OrderLineRepository') protected orderLineRepositoryGetter: Getter<OrderLineRepository>,
  ) {
    super(Orders, dataSource);
    this.orderLines = this.createHasManyRepositoryFactoryFor('orderLines', orderLineRepositoryGetter,);
    this.registerInclusionResolver('orderLines', this.orderLines.inclusionResolver);
    this.distributor = this.createBelongsToAccessorFor('distributor', distributorRepositoryGetter,);
    this.registerInclusionResolver('distributor', this.distributor.inclusionResolver);
    //this.orderLines = this.createHasManyRepositoryFactoryFor('orderLines', orderLineRepositoryGetter,);
    //this.registerInclusionResolver('orderLines', this.orderLines.inclusionResolver);
  }
}
