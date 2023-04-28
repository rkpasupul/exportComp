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
  Userroles,
  Roles,
} from '../models';
import {UserrolesRepository} from '../repositories';

export class UserrolesRolesController {
  constructor(
    @repository(UserrolesRepository) protected userrolesRepository: UserrolesRepository,
  ) { }

  @get('/userroles/{id}/roles', {
    responses: {
      '200': {
        description: 'Userroles has one Roles',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Roles),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Roles>,
  ): Promise<Roles> {
    return this.userrolesRepository.roles(id).get(filter);
  }

  @post('/userroles/{id}/roles', {
    responses: {
      '200': {
        description: 'Userroles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roles)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Userroles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRolesInUserroles',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) roles: Omit<Roles, 'id'>,
  ): Promise<Roles> {
    return this.userrolesRepository.roles(id).create(roles);
  }

  @patch('/userroles/{id}/roles', {
    responses: {
      '200': {
        description: 'Userroles.Roles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Partial<Roles>,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.userrolesRepository.roles(id).patch(roles, where);
  }

  @del('/userroles/{id}/roles', {
    responses: {
      '200': {
        description: 'Userroles.Roles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.userrolesRepository.roles(id).delete(where);
  }
}
