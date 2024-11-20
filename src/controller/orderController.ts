import { FastifyRequest, FastifyReply } from 'fastify';
import { OrderService, OrderProduct } from '../services/order';

type OrderCreateRequest = {
  userId: string;
  products: OrderProduct[];
  total: number;
}

export class OrderController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId, products, total } = request.body as OrderCreateRequest;
      const orderService = new OrderService();
      const order = await orderService.create({ userId, products, total });
      reply.code(201).send({ order, message: 'Order created' });
    } catch (error) {
      console.log(error);
      reply.code(500).send({ message: 'Error creating order' });
    }
  }
} 