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
  Distributor,
  Address,
} from '../models';
import {DistributorRepository} from '../repositories';

export class DistributorAddressController {
  constructor(
    @repository(DistributorRepository) protected distributorRepository: DistributorRepository,
  ) { }

  @get('/distributors/{id}/addresses', {
    responses: {
      '200': {
        description: 'Array of Distributor has many Address',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Address)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address[]> {
    return this.distributorRepository.address(id).find(filter);
  }

  @post('/distributors/{id}/addresses', {
    responses: {
      '200': {
        description: 'Distributor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Distributor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInDistributor',
            exclude: ['id'],
            optional: ['distributorId']
          }),
        },
      },
    }) address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.distributorRepository.address(id).create(address);
  }

  @patch('/distributors/{id}/addresses', {
    responses: {
      '200': {
        description: 'Distributor.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.distributorRepository.address(id).patch(address, where);
  }

  @del('/distributors/{id}/addresses', {
    responses: {
      '200': {
        description: 'Distributor.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.distributorRepository.address(id).delete(where);
  }
}
