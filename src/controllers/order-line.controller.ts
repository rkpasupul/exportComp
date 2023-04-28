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
import {OrderLine} from '../models';
import {OrderLineRepository} from '../repositories';

export class OrderLineController {
  constructor(
    @repository(OrderLineRepository)
    public orderLineRepository : OrderLineRepository,
  ) {}

  @post('/orderLine')
  @response(200, {
    description: 'OrderLine model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderLine)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderLine, {
            title: 'NewOrderLine',
            exclude: ['id'],
          }),
        },
      },
    })
    orderLine: Omit<OrderLine, 'id'>,
  ): Promise<OrderLine> {
    return this.orderLineRepository.create(orderLine);
  }

  @get('/orderLine/count')
  @response(200, {
    description: 'OrderLine model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderLine) where?: Where<OrderLine>,
  ): Promise<Count> {
    return this.orderLineRepository.count(where);
  }

  @get('/orderLine')
  @response(200, {
    description: 'Array of OrderLine model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderLine, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderLine) filter?: Filter<OrderLine>,
  ): Promise<OrderLine[]> {
    return this.orderLineRepository.find(filter);
  }

  @patch('/orderLine')
  @response(200, {
    description: 'OrderLine PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderLine, {partial: true}),
        },
      },
    })
    orderLine: OrderLine,
    @param.where(OrderLine) where?: Where<OrderLine>,
  ): Promise<Count> {
    return this.orderLineRepository.updateAll(orderLine, where);
  }

  @get('/orderLine/{id}')
  @response(200, {
    description: 'OrderLine model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderLine, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrderLine, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderLine>
  ): Promise<OrderLine> {
    return this.orderLineRepository.findById(id, filter);
  }

  @patch('/orderLine/{id}')
  @response(204, {
    description: 'OrderLine PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderLine, {partial: true}),
        },
      },
    })
    orderLine: OrderLine,
  ): Promise<void> {
    await this.orderLineRepository.updateById(id, orderLine);
  }

  @put('/orderLine/{id}')
  @response(204, {
    description: 'OrderLine PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() orderLine: OrderLine,
  ): Promise<void> {
    await this.orderLineRepository.replaceById(id, orderLine);
  }

  @del('/orderLine/{id}')
  @response(204, {
    description: 'OrderLine DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderLineRepository.deleteById(id);
  }
}
