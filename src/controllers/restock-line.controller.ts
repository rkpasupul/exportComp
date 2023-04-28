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
import {RestockLines} from '../models';
import {RestockLinesRepository} from '../repositories';

export class RestockLineController {
  constructor(
    @repository(RestockLinesRepository)
    public restockLinesRepository : RestockLinesRepository,
  ) {}

  @post('/restockLine')
  @response(200, {
    description: 'RestockLines model instance',
    content: {'application/json': {schema: getModelSchemaRef(RestockLines)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestockLines, {
            title: 'NewRestockLines',
            exclude: ['id'],
          }),
        },
      },
    })
    restockLines: Omit<RestockLines, 'id'>,
  ): Promise<RestockLines> {
    return this.restockLinesRepository.create(restockLines);
  }

  @get('/restockLine/count')
  @response(200, {
    description: 'RestockLines model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RestockLines) where?: Where<RestockLines>,
  ): Promise<Count> {
    return this.restockLinesRepository.count(where);
  }

  @get('/restockLine')
  @response(200, {
    description: 'Array of RestockLines model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RestockLines, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RestockLines) filter?: Filter<RestockLines>,
  ): Promise<RestockLines[]> {
    return this.restockLinesRepository.find(filter);
  }

  @patch('/restockLine')
  @response(200, {
    description: 'RestockLines PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestockLines, {partial: true}),
        },
      },
    })
    restockLines: RestockLines,
    @param.where(RestockLines) where?: Where<RestockLines>,
  ): Promise<Count> {
    return this.restockLinesRepository.updateAll(restockLines, where);
  }

  @get('/restockLine/{id}')
  @response(200, {
    description: 'RestockLines model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RestockLines, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RestockLines, {exclude: 'where'}) filter?: FilterExcludingWhere<RestockLines>
  ): Promise<RestockLines> {
    return this.restockLinesRepository.findById(id, filter);
  }

  @patch('/restockLine/{id}')
  @response(204, {
    description: 'RestockLines PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestockLines, {partial: true}),
        },
      },
    })
    restockLines: RestockLines,
  ): Promise<void> {
    await this.restockLinesRepository.updateById(id, restockLines);
  }

  @put('/restockLine/{id}')
  @response(204, {
    description: 'RestockLines PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() restockLines: RestockLines,
  ): Promise<void> {
    await this.restockLinesRepository.replaceById(id, restockLines);
  }

  @del('/restockLine/{id}')
  @response(204, {
    description: 'RestockLines DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.restockLinesRepository.deleteById(id);
  }
}
