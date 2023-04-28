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
import {Shipment} from '../models';
import {ShipmentRepository} from '../repositories';

export class ShipmentController {
  constructor(
    @repository(ShipmentRepository)
    public shipmentRepository : ShipmentRepository,
  ) {}

  @post('/shipment')
  @response(200, {
    description: 'Shipment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Shipment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shipment, {
            title: 'NewShipment',
            exclude: ['id'],
          }),
        },
      },
    })
    shipment: Omit<Shipment, 'id'>,
  ): Promise<Shipment> {
    return this.shipmentRepository.create(shipment);
  }

  @get('/shipment/count')
  @response(200, {
    description: 'Shipment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Shipment) where?: Where<Shipment>,
  ): Promise<Count> {
    return this.shipmentRepository.count(where);
  }

  @get('/shipment')
  @response(200, {
    description: 'Array of Shipment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Shipment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Shipment) filter?: Filter<Shipment>,
  ): Promise<Shipment[]> {
    return this.shipmentRepository.find(filter);
  }

  @patch('/shipment')
  @response(200, {
    description: 'Shipment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shipment, {partial: true}),
        },
      },
    })
    shipment: Shipment,
    @param.where(Shipment) where?: Where<Shipment>,
  ): Promise<Count> {
    return this.shipmentRepository.updateAll(shipment, where);
  }

  @get('/shipment/{id}')
  @response(200, {
    description: 'Shipment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Shipment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Shipment, {exclude: 'where'}) filter?: FilterExcludingWhere<Shipment>
  ): Promise<Shipment> {
    return this.shipmentRepository.findById(id, filter);
  }

  @patch('/shipment/{id}')
  @response(204, {
    description: 'Shipment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shipment, {partial: true}),
        },
      },
    })
    shipment: Shipment,
  ): Promise<void> {
    await this.shipmentRepository.updateById(id, shipment);
  }

  @put('/shipment/{id}')
  @response(204, {
    description: 'Shipment PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() shipment: Shipment,
  ): Promise<void> {
    await this.shipmentRepository.replaceById(id, shipment);
  }

  @del('/shipment/{id}')
  @response(204, {
    description: 'Shipment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.shipmentRepository.deleteById(id);
  }
}
