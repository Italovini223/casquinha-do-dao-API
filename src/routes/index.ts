import { FastifyInstance , FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { userRoutes } from './user.routes';
import { sectionRoutes } from './section.routes';
import { orderRoutes } from './order.routes';
import { productRoutes } from "./product.routes";




export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.register(userRoutes, { prefix: '/user' });
  fastify.register(sectionRoutes, { prefix: '/section' });
  fastify.register(orderRoutes, { prefix: '/order' });
  fastify.register(productRoutes, { prefix: '/product' });
}