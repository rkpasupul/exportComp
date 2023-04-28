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
import {RestockOrder} from '../models';
import {RestockOrderRepository} from '../repositories';

export class RestockOrderController {
  constructor(
    @repository(RestockOrderRepository)
    public restockOrderRepository : RestockOrderRepository,
  ) {}

  @post('/restockOrder')
  @response(200, {
    description: 'RestockOrder model instance',
    content: {'application/json': {schema: getModelSchemaRef(RestockOrder)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestockOrder, {
            title: 'NewRestockOrder',
            exclude: ['id'],
          }),
        },
      },
    })
    restockOrder: Omit<RestockOrder, 'id'>,
  ): Promise<RestockOrder> {
    return this.restockOrderRepository.create(restockOrder);
  }

  @get('/restockOrder/count')
  @response(200, {
    description: 'RestockOrder model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RestockOrder) where?: Where<RestockOrder>,
  ): Promise<Count> {
    return this.restockOrderRepository.count(where);
  }

  @get('/restockOrder')
  @response(200, {
    description: 'Array of RestockOrder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RestockOrder, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RestockOrder) filter?: Filter<RestockOrder>,
  ): Promise<RestockOrder[]> {
    return this.restockOrderRepository.find(filter);
  }

  @patch('/restockOrder')
  @response(200, {
    description: 'RestockOrder PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestockOrder, {partial: true}),
        },
      },
    })
    restockOrder: RestockOrder,
    @param.where(RestockOrder) where?: Where<RestockOrder>,
  ): Promise<Count> {
    return this.restockOrderRepository.updateAll(restockOrder, where);
  }

  @get('/restockOrder/{id}')
  @response(200, {
    description: 'RestockOrder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RestockOrder, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RestockOrder, {exclude: 'where'}) filter?: FilterExcludingWhere<RestockOrder>
  ): Promise<RestockOrder> {
    return this.restockOrderRepository.findById(id, filter);
  }

  @patch('/restockOrder/{id}')
  @response(204, {
    description: 'RestockOrder PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestockOrder, {partial: true}),
        },
      },
    })
    restockOrder: RestockOrder,
  ): Promise<void> {
    await this.restockOrderRepository.updateById(id, restockOrder);
  }

  @put('/restockOrder/{id}')
  @response(204, {
    description: 'RestockOrder PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() restockOrder: RestockOrder,
  ): Promise<void> {
    await this.restockOrderRepository.replaceById(id, restockOrder);
  }

  @del('/restockOrder/{id}')
  @response(204, {
    description: 'RestockOrder DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.restockOrderRepository.deleteById(id);
  }
}
