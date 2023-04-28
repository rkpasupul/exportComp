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
import {Warehouse} from '../models';
import {WarehouseRepository} from '../repositories';

export class WareHouseController {
  constructor(
    @repository(WarehouseRepository)
    public warehouseRepository : WarehouseRepository,
  ) {}

  @post('/wareHouse')
  @response(200, {
    description: 'Warehouse model instance',
    content: {'application/json': {schema: getModelSchemaRef(Warehouse)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Warehouse, {
            title: 'NewWarehouse',
            exclude: ['id'],
          }),
        },
      },
    })
    warehouse: Omit<Warehouse, 'id'>,
  ): Promise<Warehouse> {
    return this.warehouseRepository.create(warehouse);
  }

  @get('/wareHouse/count')
  @response(200, {
    description: 'Warehouse model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Warehouse) where?: Where<Warehouse>,
  ): Promise<Count> {
    return this.warehouseRepository.count(where);
  }

  @get('/wareHouse')
  @response(200, {
    description: 'Array of Warehouse model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Warehouse, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Warehouse) filter?: Filter<Warehouse>,
  ): Promise<Warehouse[]> {
    return this.warehouseRepository.find(filter);
  }

  @patch('/wareHouse')
  @response(200, {
    description: 'Warehouse PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Warehouse, {partial: true}),
        },
      },
    })
    warehouse: Warehouse,
    @param.where(Warehouse) where?: Where<Warehouse>,
  ): Promise<Count> {
    return this.warehouseRepository.updateAll(warehouse, where);
  }

  @get('/wareHouse/{id}')
  @response(200, {
    description: 'Warehouse model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Warehouse, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Warehouse, {exclude: 'where'}) filter?: FilterExcludingWhere<Warehouse>
  ): Promise<Warehouse> {
    return this.warehouseRepository.findById(id, filter);
  }

  @patch('/wareHouse/{id}')
  @response(204, {
    description: 'Warehouse PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Warehouse, {partial: true}),
        },
      },
    })
    warehouse: Warehouse,
  ): Promise<void> {
    await this.warehouseRepository.updateById(id, warehouse);
  }

  @put('/wareHouse/{id}')
  @response(204, {
    description: 'Warehouse PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() warehouse: Warehouse,
  ): Promise<void> {
    await this.warehouseRepository.replaceById(id, warehouse);
  }

  @del('/wareHouse/{id}')
  @response(204, {
    description: 'Warehouse DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.warehouseRepository.deleteById(id);
  }
}
