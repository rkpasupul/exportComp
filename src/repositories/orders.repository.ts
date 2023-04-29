import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {ConnectorDataSource} from '../datasources';
import {Distributor, OrderLine, Orders, OrdersRelations, Product} from '../models';
//import {OrderLineRepository} from './order-line.repository';
import {DistributorRepository} from './distributor.repository';
import {OrderLineRepository} from './order-line.repository';
import {ProductRepository} from './product.repository';

export class OrdersRepository extends DefaultCrudRepository<
  Orders,
  typeof Orders.prototype.id,
  OrdersRelations
> {


  //public readonly orderLines: HasManyRepositoryFactory<OrderLine, typeof Orders.prototype.id>;
  public readonly orderLines: HasManyRepositoryFactory<OrderLine, typeof Orders.prototype.id>;

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.id,
    OrderLine,
    typeof Orders.prototype.id
  >;
  public readonly distributor: BelongsToAccessor<Distributor, typeof Orders.prototype.id>;

  constructor(
    @inject('datasources.connector') dataSource: ConnectorDataSource, @repository.getter('DistributorRepository') protected distributorRepositoryGetter: Getter<DistributorRepository>, @repository.getter('OrderLineRepository') protected orderLineRepositoryGetter: Getter<OrderLineRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Orders, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, orderLineRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.orderLines = this.createHasManyRepositoryFactoryFor('orderLines', orderLineRepositoryGetter,);
    this.registerInclusionResolver('orderLines', this.orderLines.inclusionResolver);
    this.distributor = this.createBelongsToAccessorFor('distributor', distributorRepositoryGetter,);
    this.registerInclusionResolver('distributor', this.distributor.inclusionResolver);
    //this.orderLines = this.createHasManyRepositoryFactoryFor('orderLines', orderLineRepositoryGetter,);
    //this.registerInclusionResolver('orderLines', this.orderLines.inclusionResolver);
  }
  async orderDisProdName(id: number): Promise<{first_name: string, last_name: string, order_date: number, order_status: string, quantity: number, name: string}> {
    const quary = `select
  d.first_name,d.last_name,o.order_date,o.order_status,ol.quantity,p.name
from
  distributor d,orders o,order_line ol,product p
where
  d.id=o.distributorId and
o.id =ol.orderId and
  ol.productId = p.id and
  o.id =1;`
    const result = await this.dataSource.execute(quary);
    return {first_name: result[0].first_name, last_name: result[0].last_name, order_date: result[0].order_date, order_status: result[0].order_status, quantity: result[0].quantity, name: result[0].name}
  }
}
