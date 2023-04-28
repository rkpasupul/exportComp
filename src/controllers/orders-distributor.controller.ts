import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Orders,
  Distributor,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersDistributorController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/distributor', {
    responses: {
      '200': {
        description: 'Distributor belonging to Orders',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Distributor),
          },
        },
      },
    },
  })
  async getDistributor(
    @param.path.number('id') id: typeof Orders.prototype.id,
  ): Promise<Distributor> {
    return this.ordersRepository.distributor(id);
  }
}
