import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Orders} from '../models';
import {OrdersRepository} from '../repositories';

export class OrderController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository : OrdersRepository,
  ) {}

  @post('/order')
  @response(200, {
    description: 'Orders model instance',
    content: {'application/json': {schema: getModelSchemaRef(Orders)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrders',
            exclude: ['id'],
          }),
        },
      },
    })
    orders: Omit<Orders, 'id'>,
  ): Promise<Orders> {
    return this.ordersRepository.create(orders);
  }

  @get('/order/count')
  @response(200, {
    description: 'Orders model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Orders) where?: Where<Orders>,
  ): Promise<Count> {
    return this.ordersRepository.count(where);
  }

  @get('/order')
  @response(200, {
    description: 'Array of Orders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Orders) filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    return this.ordersRepository.find(filter);
  }

  @patch('/order')
  @response(200, {
    description: 'Orders PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Orders,
    @param.where(Orders) where?: Where<Orders>,
  ): Promise<Count> {
    return this.ordersRepository.updateAll(orders, where);
  }

  @get('/order/{id}')
  @response(200, {
    description: 'Orders model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Orders, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Orders, {exclude: 'where'}) filter?: FilterExcludingWhere<Orders>
  ): Promise<Orders> {
    return this.ordersRepository.findById(id, filter);
  }

  @patch('/order/{id}')
  @response(204, {
    description: 'Orders PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.updateById(id, orders);
  }

  @put('/order/{id}')
  @response(204, {
    description: 'Orders PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.replaceById(id, orders);
  }

  @del('/order/{id}')
  @response(204, {
    description: 'Orders DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ordersRepository.deleteById(id);
  }
}
