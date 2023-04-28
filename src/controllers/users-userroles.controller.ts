import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Userroles,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersUserrolesController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/userroles', {
    responses: {
      '200': {
        description: 'Array of Users has many Userroles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Userroles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Userroles>,
  ): Promise<Userroles[]> {
    return this.usersRepository.userroles(id).find(filter);
  }

  @post('/users/{id}/userroles', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userroles)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userroles, {
            title: 'NewUserrolesInUsers',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userroles: Omit<Userroles, 'id'>,
  ): Promise<Userroles> {
    return this.usersRepository.userroles(id).create(userroles);
  }

  @patch('/users/{id}/userroles', {
    responses: {
      '200': {
        description: 'Users.Userroles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userroles, {partial: true}),
        },
      },
    })
    userroles: Partial<Userroles>,
    @param.query.object('where', getWhereSchemaFor(Userroles)) where?: Where<Userroles>,
  ): Promise<Count> {
    return this.usersRepository.userroles(id).patch(userroles, where);
  }

  @del('/users/{id}/userroles', {
    responses: {
      '200': {
        description: 'Users.Userroles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Userroles)) where?: Where<Userroles>,
  ): Promise<Count> {
    return this.usersRepository.userroles(id).delete(where);
  }
}
