import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderLine,
  Product,
} from '../models';
import {OrderLineRepository} from '../repositories';

export class OrderLineProductController {
  constructor(
    @repository(OrderLineRepository)
    public orderLineRepository: OrderLineRepository,
  ) { }

  @get('/order-lines/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to OrderLine',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof OrderLine.prototype.id,
  ): Promise<Product> {
    return this.orderLineRepository.product(id);
  }
}
