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
import {InvoiceLines} from '../models';
import {InvoiceLinesRepository} from '../repositories';

export class InvoiceLineController {
  constructor(
    @repository(InvoiceLinesRepository)
    public invoiceLinesRepository : InvoiceLinesRepository,
  ) {}

  @post('/invoiceLine')
  @response(200, {
    description: 'InvoiceLines model instance',
    content: {'application/json': {schema: getModelSchemaRef(InvoiceLines)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceLines, {
            title: 'NewInvoiceLines',
            exclude: ['id'],
          }),
        },
      },
    })
    invoiceLines: Omit<InvoiceLines, 'id'>,
  ): Promise<InvoiceLines> {
    return this.invoiceLinesRepository.create(invoiceLines);
  }

  @get('/invoiceLine/count')
  @response(200, {
    description: 'InvoiceLines model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InvoiceLines) where?: Where<InvoiceLines>,
  ): Promise<Count> {
    return this.invoiceLinesRepository.count(where);
  }

  @get('/invoiceLine')
  @response(200, {
    description: 'Array of InvoiceLines model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InvoiceLines, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InvoiceLines) filter?: Filter<InvoiceLines>,
  ): Promise<InvoiceLines[]> {
    return this.invoiceLinesRepository.find(filter);
  }

  @patch('/invoiceLine')
  @response(200, {
    description: 'InvoiceLines PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceLines, {partial: true}),
        },
      },
    })
    invoiceLines: InvoiceLines,
    @param.where(InvoiceLines) where?: Where<InvoiceLines>,
  ): Promise<Count> {
    return this.invoiceLinesRepository.updateAll(invoiceLines, where);
  }

  @get('/invoiceLine/{id}')
  @response(200, {
    description: 'InvoiceLines model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InvoiceLines, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InvoiceLines, {exclude: 'where'}) filter?: FilterExcludingWhere<InvoiceLines>
  ): Promise<InvoiceLines> {
    return this.invoiceLinesRepository.findById(id, filter);
  }

  @patch('/invoiceLine/{id}')
  @response(204, {
    description: 'InvoiceLines PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceLines, {partial: true}),
        },
      },
    })
    invoiceLines: InvoiceLines,
  ): Promise<void> {
    await this.invoiceLinesRepository.updateById(id, invoiceLines);
  }

  @put('/invoiceLine/{id}')
  @response(204, {
    description: 'InvoiceLines PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() invoiceLines: InvoiceLines,
  ): Promise<void> {
    await this.invoiceLinesRepository.replaceById(id, invoiceLines);
  }

  @del('/invoiceLine/{id}')
  @response(204, {
    description: 'InvoiceLines DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.invoiceLinesRepository.deleteById(id);
  }
}
