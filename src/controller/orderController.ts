import { FastifyRequest, FastifyReply } from 'fastify';
import { OrderService, OrderProduct } from '../services/order';
import { appError } from '../utils/appError';

type OrderCreateRequest = {
  userId: string;
  products: OrderProduct[];
  total: number;
}

type GetByIdDataProps = {
  id: string; 
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

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const orderService = new OrderService();
      const orders = await orderService.getAll();
      reply.code(200).send({ orders });
    } catch (error) {
      console.log(error);
      reply.code(500).send({ message: 'Error getting orders' });
    }
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as GetByIdDataProps;
      const orderService = new OrderService();
      const order = await orderService.getById(id);
      reply.code(200).send({ order });
    } catch (error) {
      console.log(error);
      throw new appError('Error getting order', 500);
    }
  }
} 