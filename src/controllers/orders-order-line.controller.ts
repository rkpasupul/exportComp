import {
  Count,
  CountSchema,
  Filter,
  Where,
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  OrderLine,
  Orders,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersOrderLineController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/order-lines', {
    responses: {
      '200': {
        description: 'Array of Orders has many OrderLine',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderLine)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrderLine>,
  ): Promise<OrderLine[]> {
    return this.ordersRepository.orderLines(id).find(filter);
  }

  /* @get('/order/{id}-distributor-product-name')
   @response(200, {
     description: 'Orders model instance',
     content: {
       'application/json': {
         schema: getModelSchemaRef(Orders, {includeRelations: true}),
       },
     },
   })
   async findById(
     @param.path.number('id') id: number,
     @param.filter(Orders, {exclude: 'where'}) filter?: FilterExcludingWhere<Orders>
   ): Promise<Orders> {
     return this.ordersRepository.findById(id, {
       "include": [{"relation": "orderLines", "scope": {"include": [{"relation": "product", "scope": {"fields": ["name", "price"]}}]}}, {"relation": "distributor", "scope": {"fields": ["firstName", "lastName"], "include": [{"relation": "address"}]}}]
     });
   }*/

  @post('/orders/{id}/order-lines', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderLine)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Orders.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderLine, {
            title: 'NewOrderLineInOrders',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) orderLine: Omit<OrderLine, 'id'>,
  ): Promise<OrderLine> {
    return this.ordersRepository.orderLines(id).create(orderLine);
  }

  @patch('/orders/{id}/order-lines', {
    responses: {
      '200': {
        description: 'Orders.OrderLine PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderLine, {partial: true}),
        },
      },
    })
    orderLine: Partial<OrderLine>,
    @param.query.object('where', getWhereSchemaFor(OrderLine)) where?: Where<OrderLine>,
  ): Promise<Count> {
    return this.ordersRepository.orderLines(id).patch(orderLine, where);
  }

  @del('/orders/{id}/order-lines', {
    responses: {
      '200': {
        description: 'Orders.OrderLine DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderLine)) where?: Where<OrderLine>,
  ): Promise<Count> {
    return this.ordersRepository.orderLines(id).delete(where);
  }
  /*@get('/order/distributor-product-name/{id}')
  async orderDisProdName(@param.path.number('id') id: number): Promise<{first_name: string, last_name: string, order_date: number, order_status: string, quantity: number, name: string}> {
    return this.ordersRepository.orderDisProdName(id);
  }*/
}
