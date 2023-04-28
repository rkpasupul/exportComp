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
import {Distributor} from '../models';
import {DistributorRepository} from '../repositories';

export class DistributorController {
  constructor(
    @repository(DistributorRepository)
    public distributorRepository : DistributorRepository,
  ) {}

  @post('/distributor')
  @response(200, {
    description: 'Distributor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Distributor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distributor, {
            title: 'NewDistributor',
            exclude: ['id'],
          }),
        },
      },
    })
    distributor: Omit<Distributor, 'id'>,
  ): Promise<Distributor> {
    return this.distributorRepository.create(distributor);
  }

  @get('/distributor/count')
  @response(200, {
    description: 'Distributor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Distributor) where?: Where<Distributor>,
  ): Promise<Count> {
    return this.distributorRepository.count(where);
  }

  @get('/distributor')
  @response(200, {
    description: 'Array of Distributor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Distributor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Distributor) filter?: Filter<Distributor>,
  ): Promise<Distributor[]> {
    return this.distributorRepository.find(filter);
  }

  @patch('/distributor')
  @response(200, {
    description: 'Distributor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distributor, {partial: true}),
        },
      },
    })
    distributor: Distributor,
    @param.where(Distributor) where?: Where<Distributor>,
  ): Promise<Count> {
    return this.distributorRepository.updateAll(distributor, where);
  }

  @get('/distributor/{id}')
  @response(200, {
    description: 'Distributor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Distributor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Distributor, {exclude: 'where'}) filter?: FilterExcludingWhere<Distributor>
  ): Promise<Distributor> {
    return this.distributorRepository.findById(id, filter);
  }

  @patch('/distributor/{id}')
  @response(204, {
    description: 'Distributor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distributor, {partial: true}),
        },
      },
    })
    distributor: Distributor,
  ): Promise<void> {
    await this.distributorRepository.updateById(id, distributor);
  }

  @put('/distributor/{id}')
  @response(204, {
    description: 'Distributor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() distributor: Distributor,
  ): Promise<void> {
    await this.distributorRepository.replaceById(id, distributor);
  }

  @del('/distributor/{id}')
  @response(204, {
    description: 'Distributor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.distributorRepository.deleteById(id);
  }
}
