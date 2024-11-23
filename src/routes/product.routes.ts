import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ProductController } from "../controller/productController";
import { ensureAuthenticate } from "../middleware/ensureAuthenticate";

export async function productRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/', {preHandler: ensureAuthenticate}, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new ProductController().create(request, reply);
  });

  fastify.patch('/', {preHandler: ensureAuthenticate}, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new ProductController().update(request, reply);
  });

  fastify.get('/:id', {preHandler: ensureAuthenticate}, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new ProductController().searchById(request, reply);
  });

  fastify.get('/', {preHandler: ensureAuthenticate}, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new ProductController().getAll(request, reply);
  });

  fastify.delete('/:id', {preHandler: ensureAuthenticate}, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new ProductController().delete(request, reply);
  });
} 