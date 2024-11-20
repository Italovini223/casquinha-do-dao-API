import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ProductController } from "../controller/productController";
import { ensureAuthenticate } from "../middleware/ensureAuthenticate";

export async function productRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/', {preHandler: ensureAuthenticate}, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new ProductController().create(request, reply);
  });
} 