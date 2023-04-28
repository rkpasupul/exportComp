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
import {Userroles} from '../models';
import {UserrolesRepository} from '../repositories';

export class UserrolesController {
  constructor(
    @repository(UserrolesRepository)
    public userrolesRepository : UserrolesRepository,
  ) {}

  @post('/userroles')
  @response(200, {
    description: 'Userroles model instance',
    content: {'application/json': {schema: getModelSchemaRef(Userroles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userroles, {
            title: 'NewUserroles',
            exclude: ['id'],
          }),
        },
      },
    })
    userroles: Omit<Userroles, 'id'>,
  ): Promise<Userroles> {
    return this.userrolesRepository.create(userroles);
  }

  @get('/userroles/count')
  @response(200, {
    description: 'Userroles model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Userroles) where?: Where<Userroles>,
  ): Promise<Count> {
    return this.userrolesRepository.count(where);
  }

  @get('/userroles')
  @response(200, {
    description: 'Array of Userroles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Userroles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Userroles) filter?: Filter<Userroles>,
  ): Promise<Userroles[]> {
    return this.userrolesRepository.find(filter);
  }

  @patch('/userroles')
  @response(200, {
    description: 'Userroles PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userroles, {partial: true}),
        },
      },
    })
    userroles: Userroles,
    @param.where(Userroles) where?: Where<Userroles>,
  ): Promise<Count> {
    return this.userrolesRepository.updateAll(userroles, where);
  }

  @get('/userroles/{id}')
  @response(200, {
    description: 'Userroles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Userroles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Userroles, {exclude: 'where'}) filter?: FilterExcludingWhere<Userroles>
  ): Promise<Userroles> {
    return this.userrolesRepository.findById(id, filter);
  }

  @patch('/userroles/{id}')
  @response(204, {
    description: 'Userroles PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userroles, {partial: true}),
        },
      },
    })
    userroles: Userroles,
  ): Promise<void> {
    await this.userrolesRepository.updateById(id, userroles);
  }

  @put('/userroles/{id}')
  @response(204, {
    description: 'Userroles PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userroles: Userroles,
  ): Promise<void> {
    await this.userrolesRepository.replaceById(id, userroles);
  }

  @del('/userroles/{id}')
  @response(204, {
    description: 'Userroles DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userrolesRepository.deleteById(id);
  }
}
