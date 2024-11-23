import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { OrderController } from "../controller/orderController";
import { ensureAuthenticate } from "../middleware/ensureAuthenticate";

export async function orderRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/', { preHandler: ensureAuthenticate }, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new OrderController().create(request, reply);
  });

  fastify.get('/', { preHandler: ensureAuthenticate }, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new OrderController().getAll(request, reply);
  });

  fastify.get('/:id', { preHandler: ensureAuthenticate }, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new OrderController().getById(request, reply);
  });

  fastify.patch('/', { preHandler: ensureAuthenticate }, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new OrderController().update(request, reply);
  });

  fastify.delete('/:id', { preHandler: ensureAuthenticate }, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new OrderController().delete(request, reply);
  });

}