import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {OrderLine, OrderLineRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class OrderLineRepository extends DefaultCrudRepository<
  OrderLine,
  typeof OrderLine.prototype.id,
  OrderLineRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof OrderLine.prototype.id>;

  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(OrderLine, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
